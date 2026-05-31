type ReactionResult = { error?: string; needsLogin?: boolean; success: boolean }
type ReactionAction = (id: string, content: string) => Promise<ReactionResult>
type DeleteReactionAction = (id: string, reactionId: number) => Promise<ReactionResult>
type EditReactionAction = (id: string, reactionId: number, content: string) => Promise<ReactionResult>

export const addIdeaReactionAction: ReactionAction = async () => ({ success: true })
export const addFeatureReactionAction: ReactionAction = async () => ({ success: true })
export const addStoryReactionAction: ReactionAction = async () => ({ success: true })
export const deleteIdeaReactionAction: DeleteReactionAction = async () => ({ success: true })
export const deleteFeatureReactionAction: DeleteReactionAction = async () => ({ success: true })
export const deleteStoryReactionAction: DeleteReactionAction = async () => ({ success: true })
export const editIdeaReactionAction: EditReactionAction = async () => ({ success: true })
export const editFeatureReactionAction: EditReactionAction = async () => ({ success: true })
export const editStoryReactionAction: EditReactionAction = async () => ({ success: true })
