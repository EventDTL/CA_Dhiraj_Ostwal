import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  signInAccount,
  signOutAccount,
  createAdminAccount,
  sendResume,
  getAllResumeFiles,
  contactUs,
  getAllContactUs,
  saveMeeting,
  getAllMeetings,
  getAllEmployee,
  saveEmployee,
  getAllServices,
  getSubServicesById,
  saveService,
  saveSubService,
  updateService,
  updateSubService,
  getCurrentUser,
  downloadResumeFiles,
  getAllBanner,
  saveBanner,
  saveGalleryPhoto,
  getAllGallery,
  deleteBanner,
  updateBanner,
  getAdminProfileById,
  updateAdminProfile,
  saveYoutubeLink,
  getYoutubeLinks,
  updateYoutubeLink,
  deleteYoutubeUrl,
  updateAdminProfilePhoto,
  updateEmployee,
  deleteEmployee
} from '../appwrite/api'

import { QUERY_KEYS } from './queryKeys'

//======================== Auth API's ===============================

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user) => signInAccount(user),
  })
}

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  })
}
export const useCreatAdminAccount = () => {
  return useMutation({
    mutationFn: (user) => createAdminAccount(user),
  })
}

// ========================== Resume API's ======================

//SEND RESUME
export const useSendResume = () => {
  return useMutation({
    mutationFn: (resume) => sendResume(resume),
  })
}

// ALL RESUME LIST
export const useGetRecentResume = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_RESUME],
    queryFn: getAllResumeFiles,
  })
}

// Download Resume
export const useDownloadResume = () => {
  return useMutation({
    mutationFn: (resumeId) => downloadResumeFiles(resumeId),
  })
}

// CONTACT US
export const useContactUs = () => {
  return useMutation({
    mutationFn: (contact) => contactUs(contact),
  })
}

// All CONTACT US DATA
export const useGetAllContactUs = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_CONTACT],
    queryFn: getAllContactUs,
  })
}
// ========================= Meetings API's ======================
// Save MEETING
export const useSaveMeeting = () => {
  return useMutation({
    mutationFn: (meeting) => saveMeeting(meeting),
  })
}

// All MEETING DATA
export const useGetAllMeeting = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_MEETINGS],
    queryFn: getAllMeetings,
  })
}
// ======================= Employee API's =====================
// Save EMPLOYEE
export const useSaveEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (employee) => saveEmployee(employee),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_EMPLOYEE],
      })
    },
  })
}

// All Employee Data
export const useGetAllEmployee = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_EMPLOYEE],
    queryFn: getAllEmployee,
  })
}

// Update Banner
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (employee) => updateEmployee(employee),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_EMPLOYEE],
      })
    },
  })
}

// Delete Banner
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (EmployeeId) =>
      deleteEmployee(EmployeeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_BANNER],
      });
    },
  });
};

// ========================= Banner API's ==========================
// All Banner
export const useGetAllBanner = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_BANNER],
    queryFn: getAllBanner,
  })
}

// Save Banner
export const useSaveBanner = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (banner) => saveBanner(banner),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_BANNER],
      })
    },
  })
}

// Update Banner
export const useUpdateBanner = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (banner) => updateBanner(banner),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_BANNER],
      })
    },
  })
}

// Delete Banner
export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ BannerId, imageId }) =>
      deleteBanner(BannerId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_BANNER],
      });
    },
  });
};

// =========================== Gallery API's ===========================
// All Gallery
export const useGetAllGallery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_GALLERY],
    queryFn: getAllGallery,
  })
}

// Save Banner
export const useSaveGalleryPhoto = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (gallery) => saveGalleryPhoto(gallery),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_GALLERY],
      })
    },
  })
}
//========================== Services API's ========================
// All Services Data
export const useGetAllServices = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_SERVICES],
    queryFn: getAllServices,
  })
}

// Save Service
export const useSaveService = () => {
  return useMutation({
    mutationFn: (service) => saveService(service),
  })
}

// Services Data By Id
export const useGetSubServices = (serviceId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SERVICES_BY_ID, serviceId],
    queryFn: () => getSubServicesById(serviceId),
    enabled: !!serviceId,
  })
}

// Save SubService
export const useSubSaveService = () => {
  return useMutation({
    mutationFn: (subservice) => saveSubService(subservice),
  })
}

// Update Services
export const useUpdateService = () => {
  return useMutation({
    mutationFn: (updatedService) => updateService(updatedService),
  })
}

// Update SubServices
export const useUpdateSubService = () => {
  return useMutation({
    mutationFn: (updatedService) => updateSubService(updatedService),
  })
}
// ========================= Admin Profile =================
// Admin Profile Data
export const useGetAdminProfile= () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ADMIN_PROFILE],
    queryFn: getAdminProfileById,
  })
}

// Update Admin Profile
export const useUpdateAdminProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (officeInfoEdited) => 
       updateAdminProfile(officeInfoEdited),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ADMIN_PROFILE],
      })
    },
  })
}

// Update Admin Profile
export const useUpdateAdminProfilePhoto = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (profilePhoto) => 
       updateAdminProfilePhoto(profilePhoto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ADMIN_PROFILE],
      })
    },
  })
}

// ========================= Youtube API's ==========================
// Save Youtube Link
export const useSaveYoutubeLink = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (link) => saveYoutubeLink(link),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_YOUTUBE_LINK],
      })
    },
  })
}

// All Youtube Links 
export const useGetAllYoutube = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_YOUTUBE_LINK],
    queryFn: getYoutubeLinks,
  })
}

// Update Admin Profile
export const useUpdateYoutubeLink = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (link) => 
       updateYoutubeLink(link),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_YOUTUBE_LINK],
      })
    },
  })
}

// Delete Banner
export const useDeleteYoutube = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (Link) =>
      deleteYoutubeUrl(Link),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_YOUTUBE_LINK],
      });
    },
  });
};

// export const useSendResume = () => {
//   const queryClient = queryClient()
//   return useMutation({
//     mutationFn: (resume) => sendResume(resume),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
//       })
//     },
//   })
// }

// export const useGetPosts = () => {
//   return useInfiniteQuery({
//     queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
//     queryFn: getInfinitePosts as any,
//     getNextPageParam: (lastPage: any) => {
//       // If there's no data, there are no more pages.
//       if (lastPage && lastPage.documents.length === 0) {
//         return null;
//       }

//       // Use the $id of the last document as the cursor.
//       const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
//       return lastId;
//     },
//   });
// };

// export const useSearchPosts = (searchTerm: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
//     queryFn: () => searchPosts(searchTerm),
//     enabled: !!searchTerm,
//   });
// };

// export const useGetUserPosts = (userId?: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
//     queryFn: () => getUserPosts(userId),
//     enabled: !!userId,
//   });
// };

// export const useUpdatePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (post: IUpdatePost) => updatePost(post),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
//       });
//     },
//   });
// };

// export const useDeletePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ postId, imageId }: { postId?: string; imageId: string }) =>
//       deletePost(postId, imageId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
//       });
//     },
//   });
// };

// export const useSavePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
//       savePost(userId, postId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
//       });
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_POSTS],
//       });
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
//       });
//     },
//   });
// };

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  })
}

// export const useGetUsers = (limit?: number) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_USERS],
//     queryFn: () => getUsers(limit),
//   });
// };

// export const useGetUserById = (userId: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
//     queryFn: () => getUserById(userId),
//     enabled: !!userId,
//   });
// };

// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (user: IUpdateUser) => updateUser(user),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
//       });
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
//       });
//     },
//   });
// };
