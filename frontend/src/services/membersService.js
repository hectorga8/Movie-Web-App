import { getAllReviewersStats } from './reviewService';
import { watchlistService } from './watchlistService';
import { getBulkUsers } from './authService';

export const getSortedMembers = async () => {
  const [reviewStats, watchlistStats] = await Promise.all([
    getAllReviewersStats().catch(() => []),
    watchlistService.getAllUsersStats().catch(() => ({ items: [], lists: [] }))
  ]);

  const itemsMap = new Map((watchlistStats.items || []).map(i => [i._id, i]));
  const listsMap = new Map((watchlistStats.lists || []).map(l => [l._id, l]));

  let members = reviewStats.map(member => {
    const watchData = itemsMap.get(member._id) || {};
    const listData = listsMap.get(member._id) || {};

    const totalWatched = Math.max(member.totalWatched || 0, watchData.totalWatched || 0);
    const totalLists = listData.totalLists || 0;
    const totalLikes = member.totalLikes || 0;

    const watchedThisWeek = member.watchedThisWeek || 0;
    const listsThisWeek = listData.listsThisWeek || 0;
    const addedThisWeek = watchData.addedThisWeek || 0; 
    const favoritesThisWeek = watchData.favoritesThisWeek || 0;
    const likesThisWeek = member.likesThisWeek || 0;
    
    // Algoritmo: vistas esta semana + añadidas a lista + favoritas/me gusta + likes recibidos
    const score = (watchedThisWeek * 1) + (listsThisWeek * 2) + (addedThisWeek * 1) + (favoritesThisWeek * 3) + (likesThisWeek * 2);

    return {
      ...member,
      totalWatched,
      totalLists,
      totalLikes,
      reviewCount: member.reviewCount || 0,
      score
    };
  });

  // Fetch avatars for these members
  try {
    const userIds = members.map(m => m._id);
    if (userIds.length > 0) {
      const bulkUsers = await getBulkUsers(userIds);
      const avatarsMap = new Map(bulkUsers.map(u => [u._id, u.avatar]));
      members = members.map(m => ({
        ...m,
        avatar: avatarsMap.get(m._id) || null
      }));
    }
  } catch (error) {
    console.error("Failed to fetch bulk users for avatars", error);
  }

  // Ordenar por score de popularidad semanal
  members.sort((a, b) => b.score - a.score);
  return members;
};

// Función de utilidad para rellenar la UI con duplicados (solo a efectos visuales del prototipo)
export const fillMembersArray = (arr, minLength) => {
  if (!arr || arr.length === 0) return [];
  const result = [];
  let counter = 0;
  while (result.length < minLength) {
    for (let item of arr) {
      if (result.length >= minLength) break;
      result.push({ ...item, uniqueKey: `${item._id}_${counter}` });
      counter++;
    }
  }
  return result;
};
