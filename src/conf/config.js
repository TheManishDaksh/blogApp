
const conf = {
    url : String(import.meta.env.VITE_APPWRITE_URL),
    ProjectId : String(import.meta.env.VITE_PROJECT_ID),
    collectionId : String(import.meta.env.VITE_COLLECTION_ID),
    dbId : String(import.meta.env.VITE_DATABASE_ID),
    bucketId : String(import.meta.env.VITE_BUCKET_ID)
}

export default conf;