export async function uploadToCloudinary(fileBase64OrBuffer: string): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.warn('Cloudinary environment variables missing. Returning raw base64 / default image');
    if (fileBase64OrBuffer.startsWith('data:image')) {
      return fileBase64OrBuffer;
    }
    return 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80';
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const crypto = await import('crypto');

    const signature = crypto
      .createHash('sha1')
      .update(`timestamp=${timestamp}${apiSecret}`)
      .digest('hex');

    const formData = new URLSearchParams();
    formData.append('file', fileBase64OrBuffer);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.secure_url) {
      return data.secure_url;
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
  }

  return fileBase64OrBuffer.startsWith('data:image')
    ? fileBase64OrBuffer
    : 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80';
}
