export interface IImage {
  key: string;
  url: string;
}

export interface IUploadCloudinaryDetail {
  public_id: string;
  secure_url: string;
}

// upload result {
//   asset_id: '86879ee94b43fb02f1d20cfb9eb87632',
//   public_id: 'exam/mom4d0zxjqmpwnzqhh5n',
//   version: 1730607309,
//   version_id: '8170a2876ae03822c5190f2a87815399',
//   signature: '0c31e3b4bdc44201edd4cc74ab9dc2295a6db24b',
//   width: 600,
//   height: 576,
//   format: 'png',
//   resource_type: 'image',
//   created_at: '2024-11-03T04:15:09Z',
//   tags: [],
//   bytes: 42578,
//   type: 'upload',
//   etag: 'ac849885f734d5783aad5e08a7a82802',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dkjbxpz6u/image/upload/s--BhFV9RUp--/v1730607309/exam/mom4d0zxjqmpwnzqhh5n.png',
//   secure_url: 'https://res.cloudinary.com/dkjbxpz6u/image/upload/s--BhFV9RUp--/v1730607309/exam/mom4d0zxjqmpwnzqhh5n.png',
//   asset_folder: 'exam',
//   display_name: 'mom4d0zxjqmpwnzqhh5n',
//   access_mode: 'authenticated',
//   api_key: '764868876467542'
// }
