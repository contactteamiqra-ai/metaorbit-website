"""Regenerate numeric extrusion geometry from the unchanged original PNG.

Optional asset-authoring dependencies: Pillow, NumPy, SciPy. Not needed for
npm run build or runtime. Writes geometry bytes/metadata, never an edited PNG.
"""
from pathlib import Path
import hashlib
import json
from PIL import Image
import numpy as np
from scipy.ndimage import distance_transform_edt

root = Path(__file__).resolve().parents[1]
source = root / 'src/assets/metaorbit_logo_white_HD.png'
a = np.array(Image.open(source).convert('RGBA'))
# Symbol bounds are separate from the orange ORBIT lettering. Hue removes the
# white A that shares part of the x range; alpha preserves the negative spaces.
x0, y0, x1, y1 = 1422, 35, 2060, 887
r = a[y0:y1, x0:x1].astype(float)
mask = ((r[:, :, 3] > 100) & (r[:, :, 0] - r[:, :, 2] > 28)
        & (r[:, :, 0] > r[:, :, 1] * 1.06)
        & (r[:, :, 1] > r[:, :, 2] * 1.15))
mask = np.array(Image.fromarray(mask).resize((384, 512), Image.Resampling.NEAREST)) > 0
sdf = (distance_transform_edt(~mask) - distance_transform_edt(mask)) * 2.9 / 512
span = .22
encoded = np.round(np.clip((sdf / span + 1) * .5, 0, 1) * 255).astype('uint8')
(root / 'src/assets/orbit-symbol.sdf').write_bytes(encoded.tobytes())
metadata = {
    'source': source.name,
    'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
    'sourceRectangle': [x0, y0, x1-x0, y1-y0],
    'width': 384, 'height': 512, 'worldHeight': 2.9,
    'worldWidth': 2.9 * (x1-x0) / (y1-y0), 'distanceRange': span,
    'note': 'Numerical signed-distance geometry derived from original orange symbol pixels; no lettering, invented shapes, or modifications to original PNG.'
}
(root / 'src/assets/orbit-symbol.json').write_text(json.dumps(metadata, indent=2) + '\n')
