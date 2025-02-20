
from PIL import Image
from io import BytesIO
import io

def reduce_image(image, target_width):
    w, h = image.size
    if w > h:
        nw = target_width
        p = target_width / w
        nh = int(h * p)
    else:
        nh = target_width
        nw = target_width
    # width, height = image.size
    # coefficient = width / target_width
    # new_height = height / coefficient
    image.thumbnail( (int(nw), int(nh)), Image.Resampling.BICUBIC )
    new_image = image
    print(f" calc size: {nw}  {nh}")
    #this_image.save("path\where\to_save\your_image.jpg", quality=50)
    print(f"new resolution: {new_image.size}")
    return new_image


def image_to_byte_array(image: Image, img_format: str) -> bytes:
    # BytesIO is a file-like buffer stored in memory
    imgByteArr = io.BytesIO()
    # image.save expects a file-like as a argument
    if image.format is None:
        image.format = img_format
    print(f"image format: {image.format}")
    image.save(imgByteArr, format=image.format)
    # Turn the BytesIO object back into a bytes object
    imgByteArr = imgByteArr.getvalue()
    return imgByteArr

img_file = "original.jpg"
new_img_file = "test.jpg"

base_width = 200
img = Image.open(img_file)
wpercent = (base_width / float(img.size[0]))
hsize = int((float(img.size[1]) * float(wpercent)))
new_img = img.resize((base_width, hsize), Image.Resampling.LANCZOS)
new_img.save(new_img_file)

# save a new file with reduced image
img = Image.open(img_file)
img_bytes = image_to_byte_array(img)
# simulate using byte array from the server
small_image = Image.open(io.BytesIO(img_bytes))
wpercent = (base_width / float(small_image.size[0]))
hsize = int((float(small_image.size[1]) * float(wpercent)))
resized_img = small_image.resize((base_width, hsize), Image.Resampling.LANCZOS)
resized_img.save("test_from_bytes.jpg")

# better simulation of reduction
img = Image.open(img_file)
wpercent = (base_width / float(img.size[0]))
hsize = int((float(img.size[1]) * float(wpercent)))
resized_img = img.resize((base_width, hsize), Image.Resampling.LANCZOS)
img_bytes = image_to_byte_array(resized_img, 'JPEG')

# this is the byte array content the server delivers to the browser
with open ("new_binary.jpg", "wb") as f:
    f.write(img_bytes)
# now reading the binary back into image
img = Image.open("new_binary.jpg")
img.save("new_binary_noconversion.jpg")




