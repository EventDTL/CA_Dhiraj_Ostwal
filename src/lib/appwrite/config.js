import { Client, Account, Databases, Storage, Avatars } from 'appwrite'

export const appwriteConfig = {
  url: 'https://cloud.appwrite.io/v1',
  projectId: '6673bc300024d51da27a',
  databaseId: '6673bd5a001a9aedfe0e',
  storageId: '6673beee001b627e4cfa',
  adminCollectionId: '6673c0ed00011683501a',
  carerrCollectionId: '6673bd64002a2dd705ed',
  contactCollectionId: '6673c1ac0016e65ccee0',
  employeeCollectionId: '6673c4580039effa9c57',
  galleryCollectionId: '6673cbcc0019c56dc828',
  socialCollectionId: '6673c8690006f3b73621',
  youtubeCollectionId: '6673cc5d003b298d1f7a',
  bannerCollectionId: '66794cec00360b377bdf',
  meetingsCollectionId: '6675547500022dad0d3c',
  servicesCollectionId: '6675baa60035356f81c8',
  subservicesCollectionId: '6675bb4c000daa6d94c8',
  adminProfileCollectionId :'667d1680002b3f1c74c9'
}
const client = new Client()

client.setEndpoint(appwriteConfig.url)
client.setProject(appwriteConfig.projectId)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)
