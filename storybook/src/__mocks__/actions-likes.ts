type LikeResult = { error?: string; needsLogin?: boolean; success: boolean }
type LikeAction = (id: string, liked: boolean) => Promise<LikeResult>

export const toggleIdeaLikeAction: LikeAction = async () => ({ success: true })
export const toggleFeatureLikeAction: LikeAction = async () => ({ success: true })
export const toggleStoryLikeAction: LikeAction = async () => ({ success: true })
