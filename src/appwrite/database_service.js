import config from "../config/config";
import { Client, Databases, ID, Query } from "appwrite";

export class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client)

    }

    async createPost({ title, slug, content, featuredimage, status, userId }) {
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId
                }
            )

        } catch (error) {
            console.log("Appwrite::createPost::error::", error)
        }
    }

    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite::updatePost::error::", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug)
            return true;

        } catch (error) {
            console.log("Appwrite::deletePost::error::", error)
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);

        } catch (error) {
            console.log("Appwrite::getPost::error::", error)
            return false;
        }
    }

    async getPosts( queries=[Query.equal("status", "active")] ) {
        try {
           return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId ,queries);

        } catch (error) {
            console.log("Appwrite::getPosts::error::", error)
            return false;
        }
    }

    async createSocialPost({ caption, postimage, tags, creatorId, creatorName }) {
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteSocialCollectionId, ID.unique(),
                {
                    caption,
                    postimage, 
                    tags, 
                    creatorId, 
                    creatorName
                }
            )

        } catch (error) {
            console.log("Appwrite::createSocialPost::error::", error)
        }
    }

    async updateSocialPost(socialPostId, { caption, postimage, tags }) {
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteSocialCollectionId, socialPostId,
                {
                    caption,
                    postimage,
                    tags
                }
            )
        } catch (error) {
            console.log("Appwrite::updateSocialPost::error::", error)
        }
    }

    async deleteSocialPost(socialPostId) {
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteSocialCollectionId, socialPostId)
            return true;

        } catch (error) {
            console.log("Appwrite::deleteSocialPost::error::", error)
            return false;
        }
    }

  
}


const databaseService = new DatabaseService();
export default databaseService;