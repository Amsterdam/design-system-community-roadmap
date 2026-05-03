type ReactionResult = { error?: string; needsLogin?: boolean; success: boolean }
type ReactionAction = (id: string, content: string) => Promise<ReactionResult>

export const addIdeaReactionAction: ReactionAction = async () => ({ success: true })
export const addFeatureReactionAction: ReactionAction = async () => ({ success: true })
export const addStoryReactionAction: ReactionAction = async () => ({ success: true })
