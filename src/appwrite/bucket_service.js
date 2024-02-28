import config from "../config/config";
import { Client, ID, Storage } from "appwrite";

export class BucketService {

    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.bucket = new Storage(this.client)

    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(config.appwriteBucketId, ID.unique(), file);

        } catch (error) {
            console.log("Appwrite::uploadFile::error::", error)
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(config.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite::deleteFile::error::", error)
            return false;
        }
    }

    getFilePreview(fileId) {

        return this.bucket.getFilePreview(config.appwriteBucketId, fileId);

    }
}


const bucketService = new BucketService();

export default bucketService;