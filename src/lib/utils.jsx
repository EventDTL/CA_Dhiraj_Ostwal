import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { appwriteConfig, databases } from './appwrite/config'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file) => URL.createObjectURL(file)

export function formatDateString(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('en-US', options)

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })

  return `${formattedDate} at ${time}`
}

export const multiFormatDateString = (timestamp = '') => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000)
  const date = new Date(timestampNum * 1000)
  const now = new Date()

  const diff = now.getTime() - date.getTime()
  const diffInSeconds = diff / 1000
  const diffInMinutes = diffInSeconds / 60
  const diffInHours = diffInMinutes / 60
  const diffInDays = diffInHours / 24

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp)
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`
    default:
      return 'Just now'
  }
}

export const checkIsLiked = (likeList, userId) => {
  return likeList.includes(userId)
}

export async function followUser(
  followsArray,
  LoginfollowingArray,
  visitDocId,
  loginDocId
) {
  try {
    const updatedCurrentUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followersCollectionId,
      visitDocId,
      {
        followers: followsArray,
      }
    )

    if (!updatedCurrentUser) throw new Error('Failed to update current user')

    const updatedTargetUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followingsCollectionId,
      loginDocId,
      {
        followings: LoginfollowingArray,
      }
    )

    if (!updatedTargetUser) throw new Error('Failed to update target user')

    return { updatedCurrentUser, updatedTargetUser }
  } catch (error) {
    console.error(error)
    throw error
  }
}
