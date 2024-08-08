import { ID, Query } from 'appwrite'
import { appwriteConfig, account, databases, storage, avatars } from './config'

// AUTH
// ============================== SIGN IN
export async function signInAccount(user) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    )
    return session
  } catch (error) {
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get()
    return currentAccount
  } catch (error) {
  }
}

// ============================== SIGN UP FUNCTION
export async function createAdminAccount(user) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )
    if (!newAccount) throw new Error('Failed to create new account')

    const newUser = await saveAdminToDB({
      UserName: user.username,
      Email: newAccount.email,
      AccountId: newAccount.$id,
      Name: newAccount.name,
    })

    return newUser
  } catch (error) {
    return error
  }
}

// ============================== SAVE USER TO DB FUNCTION
export async function saveAdminToDB(user) {
  try {
    const uniqueID = ID.unique()
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      uniqueID,
      user
    )
    return newUser
  } catch (error) {
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount()
    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      [Query.equal('AccountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    return null
  }
}

// ============================== SIGN OUT
export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current')
    return session
  } catch (error) {
  }
}

// // USER
// // ============================== SEND RESUME
export async function sendResume(resume) {
  try {
    if (!resume.file) {
      throw new Error('No file provided')
    }
    const uploadedFile = await uploadFile(resume.file)
    if (!uploadedFile) throw new Error('File upload failed')

    const fileUrl = getFilePreview(uploadedFile.$id)
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id)
      throw new Error('Failed to get file preview')
    }

    // Send Resume
    const newResume = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.carerrCollectionId,
      ID.unique(),
      {
        Name: resume.name,
        Interest: resume.interest,
        ResumeUrl: fileUrl,
        ImageId: uploadedFile.$id,
        Email: resume.email,
        Phone: resume.tel, // Fixed field name to match form data
        SubmitDate: new Date().toISOString(),
        admin: '6673dfce000cb39229e0',
      }
    )

    if (!newResume) {
      await deleteFile(uploadedFile.$id)
      throw new Error('Failed to create document')
    }

    return newResume
  } catch (error) {
    console.error(error)
    throw error
  }
}

// // ============================== UPLOAD FILE
export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )

    return uploadedFile
  } catch (error) {
  }
}

// // ============================== GET FILE URL
// ============================== GET FILE URL
export function getFilePreview(fileId, ratioType = 'wide') {
  try {
    let width, height;

    if (ratioType === 'wide') {
      width = 4000;
      height = 4000;
    } else if (ratioType === 'portrait') {
      width = 1400;
      height = 2500;
    } else {
      width = 2048;
      height = 2000;
    }

    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId
    );

    if (!fileUrl) throw new Error('Failed to get file preview');

    return fileUrl;
  } catch (error) {
    console.error(error);
  }
}


// // ============================== DELETE FILE
export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId)
    return { status: 'ok' }
  } catch (error) {
  }
}

// Download RESUME
export async function downloadResumeFiles(imageId) {
  try {
    const result = storage.getFileDownload(appwriteConfig.storageId, imageId)
    if (!result) throw Error
    return result
  } catch (error) {
}
}

// All RESUME
export async function getAllResumeFiles() {
  try {
    const allresume = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.carerrCollectionId
    )
    if (!allresume) throw Error
    return allresume
  } catch (error) {
  }
}

//// ============================== Contact Us
export async function contactUs(contact) {
  try {
    const savecontact = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.contactCollectionId,
      ID.unique(),
      {
        FirstName: contact.firstname,
        LastName: contact.lastname,
        Email: contact.email,
        Phone: contact.phone,
        Message: contact.message,
        SubmitDate: new Date().toISOString(),
        admin: '6673dfce000cb39229e0',
      }
    )

    if (!savecontact) {
      throw new Error('Failed to Contact Us')
    }
    return savecontact
  } catch (error) {
    console.error(error)
    throw error
  }
}

// All CONTACT US DATA
export async function getAllContactUs() {
  try {
    const allContact = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.contactCollectionId
    )

    if (!allContact) throw Error
    return allContact
  } catch (error) {
  }
}

//// ============================== Meeting
export async function saveMeeting(meeting) {
  try {
    const savemeeting = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.meetingsCollectionId,
      ID.unique(),
      {
        WhatsAppNumber: meeting.whatsappNumber,
        Subject: meeting.subject,
        DateTime: meeting.datetime,
        SubmitDate: new Date().toISOString(),
        admin: '6673dfce000cb39229e0',
      }
    )
    if (!savemeeting) {
      throw new Error('Failed to Book Meeting')
    }
    return savemeeting
  } catch (error) {
    console.error(error)
    throw error
  }
}

// All MEETING DATA
export async function getAllMeetings() {
  try {
    const allMeeting = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.meetingsCollectionId
    )

    if (!allMeeting) throw Error
    return allMeeting
  } catch (error) {
  }
}

//============================ Employee API ===========================

// All Employee Data
export async function getAllEmployee() {
  try {
    const allEmployee = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.employeeCollectionId
    )

    if (!allEmployee) throw Error
    return allEmployee.documents
  } catch (error) {
  }
}

// Save Employee 
export async function saveEmployee(employee) {
  try {

    if (!employee.image) {
      throw new Error('No file provided')
    }
    const uploadedFile = await uploadFile(employee.image)
    if (!uploadedFile) throw new Error('File upload failed')

    const fileUrl = getFilePreview(uploadedFile.$id)
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id)
      throw new Error('Failed to get file preview')
    }

    const saveEmployee = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.employeeCollectionId,
      ID.unique(),
      {
        FirstName: employee.firstname,
        LastName: employee.lastname,
        Email: employee.email,
        Phone: employee.phone,
        Address: employee.address,
        Gender: employee.gender,
        BirthDate: employee.birthDate,
        Position: employee.position,
        SubmitDate: new Date().toISOString(),
        admin: '6673dfce000cb39229e0',
        ImageId: uploadedFile.$id,
        ImageUrl: fileUrl,
      }
    )
    if (!saveEmployee) {
      throw new Error('Failed to Book Meeting')
    }
    return saveEmployee
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Update Employee
export async function updateEmployee(employee) {
  try {
    let fileUrl = employee.deleteId.imageUrl;
    let uploadedFileId = employee.deleteId.imageId;

    if (employee.image) { 
      const uploadedFile = await uploadFile(employee.image);
      if (!uploadedFile) throw new Error('File upload failed');

      fileUrl = getFilePreview(uploadedFile.$id,"wide");
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw new Error('Failed to get file preview');
      }
      uploadedFileId = uploadedFile.$id;
    }

    const saveUpdatedEmployee = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.employeeCollectionId,
      employee.deleteId.$id,
      {
        FirstName: employee.firstname,
        LastName: employee.lastname,
        Email: employee.email,
        Phone: employee.phone,
        Address: employee.address,
        Gender: employee.gender,
        BirthDate: employee.birthDate,
        Position: employee.position,
        SubmitDate: new Date().toISOString(),
        admin: '6673dfce000cb39229e0',
        ImageId: uploadedFileId,
        ImageUrl: fileUrl,
      }
    );

    if (!saveUpdatedEmployee) {
      throw new Error('Failed to Update Banner');
    }

    if (employee.deleteId.image && employee.deleteId.imageId) {
      await deleteFile(employee.deleteId.imageId);
    }

    return saveUpdatedEmployee;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Delete Employee
export async function deleteEmployee(EmployeeId) {
  if (!EmployeeId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.employeeCollectionId,
      EmployeeId.$id
    );

    if (!statusCode) throw Error;

    await deleteFile(EmployeeId.ImageId);

    return { status: 'Ok' };
  } catch (error) {
  }
}

// All Banner Data
export async function getAllBanner() {
  try {
    const allBanner = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bannerCollectionId
    )
    if (!allBanner) throw Error
    return allBanner.documents
  } catch (error) {
  }
}


//Save Banner
export async function saveBanner(banner) {
  try {

    if (!banner.image) {
      throw new Error('No file provided')
    }
    const uploadedFile = await uploadFile(banner.image)
    if (!uploadedFile) throw new Error('File upload failed')

    const fileUrl = getFilePreview(uploadedFile.$id)
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id)
      throw new Error('Failed to get file preview')
    }

    const saveBanner = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bannerCollectionId,
      ID.unique(),
      {
        Subtitle: banner.title,
        Title: banner.subtitle,
        ImageUrl: fileUrl,
        ImageId: uploadedFile.$id
      }
    )
    if (!saveBanner) {
      throw new Error('Failed to Book Meeting')
    }
    return saveBanner
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Update Banner
export async function updateBanner(updateBanner) {
  try {
    let fileUrl = updateBanner.imageUrl;
    let uploadedFileId = updateBanner.imageId;

    if (updateBanner.image) {
      const uploadedFile = await uploadFile(updateBanner.image);
      if (!uploadedFile) throw new Error('File upload failed');

      fileUrl = getFilePreview(uploadedFile.$id,"wide");
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw new Error('Failed to get file preview');
      }

      uploadedFileId = uploadedFile.$id;
    }

    const saveUpdatedBanner = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bannerCollectionId,
      updateBanner.id,
      {
        Title: updateBanner.title,
        Subtitle: updateBanner.subtitle,
        ImageUrl: fileUrl,
        ImageId: uploadedFileId,
      }
    );

    if (!saveUpdatedBanner) {
      throw new Error('Failed to Update Banner');
    }

    if (updateBanner.image && updateBanner.imageId) {
      await deleteFile(updateBanner.imageId);
    }

    return saveUpdatedBanner;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Delete Banner
export async function deleteBanner(BannerId, imageId) {
  
  if (!BannerId || !imageId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bannerCollectionId,
      BannerId
    );

    if (!statusCode) throw Error;

    await deleteFile(imageId);

    return { status: 'Ok' };
  } catch (error) {
  }
}


// All Gallery Data 
export async function getAllGallery() {
  try {
    const allGallery = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.galleryCollectionId
    )
    if (!allGallery) throw Error
    return allGallery
  } catch (error) {
  }
}

// Save Gallery Photo
export async function saveGalleryPhoto(gallery) {
  try {
    if (!gallery.image) {
      throw new Error('No file provided')
    }
    const uploadedFile = await uploadFile(gallery.image)
    if (!uploadedFile) throw new Error('File upload failed')

    const fileUrl = getFilePreview(uploadedFile.$id)
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id)
      throw new Error('Failed to get file preview')
    }

    const savePhoto = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.galleryCollectionId,
      ID.unique(),
      {
        ImageType: gallery.imagetype,
        ImageUrl: fileUrl,
      }
    )
    if (!savePhoto) {
      throw new Error('Failed to Book Meeting')
    }
    return savePhoto
  } catch (error) {
    console.error(error)
    throw error
  }
}
// Save Service
export async function saveService(service) {
  try {
    const saveService = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.servicesCollectionId,
      ID.unique(),
      {
        ServiceName: service.ServiceName,
        ServiceHeadline: service.ServiceHeadline,
        admin: '6673dfce000cb39229e0',
      }
    )
    if (!saveService) {
      throw new Error('Failed to Save Service')
    }
    return saveService
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Update Service
export async function updateService(updateService) {
  try {
    const saveupdateService = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.servicesCollectionId,
      updateService.ServiceId,
      {
        ServiceName: updateService.ServiceName,
        ServiceHeadline: updateService.ServiceHeadline,
      }
    )
    if (!saveupdateService) {
      throw new Error('Failed to Update Service')
    }
    return saveupdateService
  } catch (error) {
    console.error(error)
    throw error
  }
}

// All Service Data
export async function getAllServices() {
  try {
    const allServices = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.servicesCollectionId
    )

    if (!allServices) throw Error
    return allServices.documents
  } catch (error) {
  }
}

// SubServiceById
export async function getSubServicesById(serviceId) {
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.servicesCollectionId,
      serviceId
    )

    return response
  } catch (error) {
    console.error('Failed to fetch sub-services:', error)
    throw new Error('Failed to fetch sub-services')
  }
}

// Save SubService
export async function saveSubService(subservice) {
  try {
    const saveSubService = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.subservicesCollectionId,
      ID.unique(),
      {
        Title: subservice.Title,
        Description: subservice.Description,
        services: subservice.serviceId,
      }
    )
    if (!saveSubService) {
      throw new Error('Failed to Save SubService')
    }
    return saveSubService
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Update Service
export async function updateSubService(updateSubService) {
  try {
    const saveupdateSubService = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.subservicesCollectionId,
      updateSubService.ServiceId,
      {
        Title: updateSubService.Title,
        Description: updateSubService.Description,
      }
    )
    if (!saveupdateSubService) {
      throw new Error('Failed to Update SubService')
    }
    return saveupdateSubService
  } catch (error) {
    console.error(error)
    throw error
  }
}


// AdminProfileById
export async function getAdminProfileById() {
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.adminProfileCollectionId,
      '667e547d0023b802bafe'
    )
    return response
  } catch (error) {
    console.error('Failed to fetch sub-services:', error)
    throw new Error('Failed to fetch sub-services')
  }
}


// Update Admin Profile
export async function updateAdminProfile(officeInfoEdited) {
  
  try {
    const updateAdminProfile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.adminProfileCollectionId,
      '667e547d0023b802bafe',
      {
        Address: officeInfoEdited.address,
        Email: officeInfoEdited.email,
        Phone: officeInfoEdited.phone,
        GoogleMap: officeInfoEdited.googleMap,
        Facebook: officeInfoEdited.facebook,
        LinkedIn: officeInfoEdited.linkedin,
        Instagram: officeInfoEdited.description,
        YouTube: officeInfoEdited.youtube,
        WhatsApp: officeInfoEdited.whatsapp,
      }
    )
    if (!updateAdminProfile) {
      throw new Error('Failed to Update Admin Profile')
    }
    return updateAdminProfile
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Update Admin Profile Photo
export async function updateAdminProfilePhoto(adminPhoto) {

   if (!adminPhoto.image) {
      throw new Error('No file provided')
    }
  try {
    let fileUrl = adminPhoto.imageUrl;
    let uploadedFileId = adminPhoto.imageId;

    if (adminPhoto.image) {
      const uploadedFile = await uploadFile(adminPhoto.image);
      if (!uploadedFile) throw new Error('File upload failed');

      fileUrl = getFilePreview(uploadedFile.$id,"wide");
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw new Error('Failed to get file preview');
      }
      uploadedFileId = uploadedFile.$id;
    }

    const saveUpdatedPhoto = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.adminProfileCollectionId,
      '667e547d0023b802bafe',
      {
        ImageUrl: fileUrl,
        ProfilePhotoId: uploadedFileId,
      }
    );

    if (!saveUpdatedPhoto) {
      throw new Error('Failed to Update Admin Photo');
    }

    if (adminPhoto.image && adminPhoto.imageId) {
      await deleteFile(adminPhoto.imageId);
    }

    return saveUpdatedPhoto;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// Get All YoutubeLinks
export async function getYoutubeLinks() {
  try {
    const links = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.youtubeCollectionId
    )
    if (!links) throw Error
    return links
  } catch (error) {
  }
}


// Save Youtube Link
export async function saveYoutubeLink(link) {
  try {
    const saveLink = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.youtubeCollectionId,
      ID.unique(),
      {
        Title: link.Title,
        YoutubeUrl : link.YoutubeUrl,
        IsVisible : true
      }
    )
    if (!saveLink) {
      throw new Error('Failed to Save Youtube Url')
    }
    return saveLink
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Update Youtube Url
export async function updateYoutubeLink(link) {

  
  try {
    const updateLink = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.youtubeCollectionId,
      link.id,
      {
        Title: link.Title,
        YoutubeUrl : link.YoutubeUrl,
        IsVisible : true
      }
    )
    if (!updateLink) {
      throw new Error('Failed to Update Youtube Url')
    }
    return updateLink
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Delete Youtube Url
export async function deleteYoutubeUrl(urlId) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.youtubeCollectionId,
      urlId.id
    )
    if (!statusCode) throw Error
    return { status: 'Ok' }
  } catch (error) {
  }
}

// export const getSubServicesById = (serviceId) => {
//   return useQuery(['subServices', serviceId], async () => {
//     const response = await databases.listDocuments(
//       'database-id',
//       'sub_services',
//       [Query.equal('service_id', serviceId)]
//     )
//     return response.documents
//   })
// }
// // ============================== GET POSTS
// export async function searchPosts(searchTerm: string) {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.postCollectionId,
//       [Query.search('caption', searchTerm)]
//     )

//     if (!posts) throw Error

//     return posts
//   } catch (error) {
//     console.log(error)
//   }
// }

// // ============================== GET POST BY ID
// export async function getPostById(postId?: string) {
//   if (!postId) throw Error

//   try {
//     const post = await databases.getDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.postCollectionId,
//       postId
//     )

//     if (!post) throw Error

//     return post
//   } catch (error) {
//     console.log(error)
//   }
// }

// // ============================== UPDATE POST
// export async function updatePost(post: IUpdatePost) {
//   const hasFileToUpdate = post.file.length > 0

//   try {
//     let image = {
//       imageUrl: post.imageUrl,
//       imageId: post.imageId,
//     }

//     if (hasFileToUpdate) {
//       // Upload new file to appwrite storage
//       const uploadedFile = await uploadFile(post.file[0])
//       if (!uploadedFile) throw Error

//       // Get new file url
//       const fileUrl = getFilePreview(uploadedFile.$id)
//       if (!fileUrl) {
//         await deleteFile(uploadedFile.$id)
//         throw Error
//       }

//       image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id }
//     }

//     // Convert tags into array
//     const tags = post.tags?.replace(/ /g, '').split(',') || []

//     //  Update post
//     const updatedPost = await databases.updateDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.postCollectionId,
//       post.postId,
//       {
//         caption: post.caption,
//         imageUrl: image.imageUrl,
//         imageId: image.imageId,
//         location: post.location,
//         tags: tags,
//       }
//     )

//     // Failed to update
//     if (!updatedPost) {
//       // Delete new file that has been recently uploaded
//       if (hasFileToUpdate) {
//         await deleteFile(image.imageId)
//       }

//       // If no new file uploaded, just throw error
//       throw Error
//     }

//     // Safely delete old file after successful update
//     if (hasFileToUpdate) {
//       await deleteFile(post.imageId)
//     }

//     return updatedPost
//   } catch (error) {
//     console.log(error)
//   }
// }

// // ============================== DELETE POST
// export async function deletePost(postId?: string, imageId?: string) {
//   if (!postId || !imageId) return

//   try {
//     const statusCode = await databases.deleteDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.postCollectionId,
//       postId
//     )

//     if (!statusCode) throw Error

//     await deleteFile(imageId)

//     return { status: 'Ok' }
//   } catch (error) {
//     console.log(error)
//   }
// }

// // ============================== LIKE / UNLIKE POST
// export async function likePost(postId: string, likesArray: string[]) {
//   try {
//     console.log(likesArray)
//     const updatedPost = await databases.updateDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.postCollectionId,
//       postId,
//       {
//         likes: likesArray,
//       }
//     )

//     if (!updatedPost) throw Error

//     return updatedPost
//   } catch (error) {
//     console.log(error)
//   }
// }

// // ============================== SAVE POST
// export async function savePost(userId: string, postId: string) {
//   try {
//     const updatedPost = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.savesCollectionId,
//       ID.unique(),
//       {
//         user: userId,
//         post: postId,
//       }
//     )

//     if (!updatedPost) throw Error

//     return updatedPost
//   } catch (error) {
//     console.log(error)
//   }
// }
// // ============================== DELETE SAVED POST
// export async function deleteSavedPost(savedRecordId: string) {
//   try {
//     const statusCode = await databases.deleteDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.savesCollectionId,
//       savedRecordId
//     )

//     if (!statusCode) throw Error

//     return { status: 'Ok' }
//   } catch (error) {
//     console.log(error)
//   }
// }
// // ============================== GET FOLLOWERS DATA

// export async function getFollowers(userId?: string) {
//   if (!userId) return
//   try {
//     const followersData = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.followersCollectionId,
//       [Query.equal('userID', userId)]
//     )
//     return followersData
//   } catch (error) {
//     console.error(error)
//   }
// }

// // ============================== GET FOLLOWINGS DATA

// export async function getFollowings(userId?: string) {
//   if (!userId) return
//   try {
//     const followingData = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.followingsCollectionId,
//       [Query.equal('userID', userId)]
//     )
//     return followingData
//   } catch (error) {
//     console.error(error)
//   }
// }
// // ============================== GET USER'S POST
// export async function getUserPosts(userId?: string) {
//   if (!userId) return

//   try {
//     const post = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.postCollectionId,
//       [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
//     )

//     if (!post) throw Error

//     return post
//   } catch (error) {
//     console.log(error)
//   }
// }

// // ============================== GET POPULAR POSTS (BY HIGHEST LIKE COUNT)
// export async function getRecentPosts() {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.postCollectionId,
//       [Query.orderDesc('$createdAt'), Query.limit(20)]
//     )

//     if (!posts) throw Error
//     return posts
//   } catch (error) {
//     console.log(error)
//   }
// }

// // ============================================================
// // USER
// // ============================================================

// // ============================== GET USERS
// export async function getUsers(limit?: number) {
//   const queries: any[] = [Query.orderDesc('$createdAt')]

//   if (limit) {
//     queries.push(Query.limit(limit))
//   }

//   try {
//     const users = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       queries
//     )

//     if (!users) throw Error

//     return users
//   } catch (error) {
//     console.log(error)
//   }
// }

// // ============================== GET USER BY ID
// export async function getUserById(userId: string) {
//   try {
//     const user = await databases.getDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       userId
//     )

//     if (!user) throw Error

//     return user
//   } catch (error) {
//     console.log(error)
//   }
// }

// // ============================== UPDATE USER
// export async function updateUser(user: IUpdateUser) {
//   const hasFileToUpdate = user.file.length > 0
//   try {
//     let image = {
//       imageUrl: user.imageUrl,
//       imageId: user.imageId,
//     }

//     if (hasFileToUpdate) {
//       // Upload new file to appwrite storage
//       const uploadedFile = await uploadFile(user.file[0])
//       if (!uploadedFile) throw Error

//       // Get new file url
//       const fileUrl = getFilePreview(uploadedFile.$id)
//       if (!fileUrl) {
//         await deleteFile(uploadedFile.$id)
//         throw Error
//       }

//       image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id }
//     }

//     //  Update user
//     const updatedUser = await databases.updateDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       user.userId,
//       {
//         name: user.name,
//         bio: user.bio,
//         imageUrl: image.imageUrl,
//         imageId: image.imageId,
//       }
//     )

//     // Failed to update
//     if (!updatedUser) {
//       // Delete new file that has been recently uploaded
//       if (hasFileToUpdate) {
//         await deleteFile(image.imageId)
//       }
//       // If no new file uploaded, just throw error
//       throw Error
//     }

//     // Safely delete old file after successful update
//     if (user.imageId && hasFileToUpdate) {
//       await deleteFile(user.imageId)
//     }

//     return updatedUser
//   } catch (error) {
//     console.log(error)
//   }
// }
