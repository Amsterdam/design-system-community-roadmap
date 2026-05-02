import { z } from 'zod'

const strapiBase = z.object({
  createdAt: z.string().optional(),
  documentId: z.string(),
  id: z.number(),
  updatedAt: z.string().optional(),
})

export const StrapiImageSchema = z.object({
  alternativeText: z.string().nullable(),
  height: z.number().nullable(),
  id: z.number(),
  url: z.string(),
  width: z.number().nullable(),
})

export const ReactionSchema = z.object({
  content: z.string(),
  end_user: z.object({ documentId: z.string(), id: z.number(), name: z.string() }).nullable().optional(),
  id: z.number().optional(),
})

export const IdeaStatusSchema = z.enum(['in_review', 'accepted', 'postponed'])

export const EndUserSchema = strapiBase.extend({
  emoji: z.string().optional(),
  feature_likes: z.array(z.any()).optional(),
  idea_likes: z.array(z.any()).optional(),
  ideas: z.array(z.any()).optional(),
  isTeam: z.boolean().optional(),
  name: z.string(),
  story_likes: z.array(z.any()).optional(),
})

export const PopulatedLikeSchema = z.object({
  documentId: z.string(),
  end_user: z
    .object({
      documentId: z.string(),
      name: z.string().optional(),
    })
    .nullable()
    .optional(),
})

export const NestedFeatureSchema = z.object({
  title: z.string(),
  documentId: z.string(),
  endDate: z.string().nullable().optional(),
  id: z.number(),
  startDate: z.string().optional(),
})

export const IdeaSchema = strapiBase.extend({
  title: z.string(),
  content: z.string(),
  end_users: z.array(EndUserSchema).optional(),
  features: z.array(NestedFeatureSchema).optional(),
  images: z.array(StrapiImageSchema).optional(),
  likes: z.array(PopulatedLikeSchema).optional(),
  publishedAt: z.string().nullable().optional(),
  reactions: z.array(ReactionSchema).optional(),
  status: IdeaStatusSchema.optional(),
})

export const FeatureSchema = strapiBase.extend({
  title: z.string(),
  content: z.string(),
  endDate: z.string().nullable().optional(),
  idea: IdeaSchema.nullable().optional(),
  images: z.array(StrapiImageSchema).optional(),
  likes: z.array(PopulatedLikeSchema).optional(),
  publishedAt: z.string().nullable().optional(),
  reactions: z.array(ReactionSchema).optional(),
  startDate: z.string().optional(),
  story: z
    .object({
      title: z.string(),
      documentId: z.string(),
    })
    .nullable()
    .optional(),
})

export const StorySchema = strapiBase.extend({
  title: z.string(),
  content: z.string(),
  endDate: z.string().nullable().optional(),
  features: z.array(NestedFeatureSchema).optional(),
  images: z.array(StrapiImageSchema).optional(),
  likes: z.array(PopulatedLikeSchema).optional(),
  publishedAt: z.string().nullable().optional(),
  reactions: z.array(ReactionSchema).optional(),
  startDate: z.string().optional(),
})

export const IdeaLikeSchema = strapiBase.extend({
  end_user: EndUserSchema.nullable().optional(),
  idea: IdeaSchema.nullable().optional(),
})

export const FeatureLikeSchema = strapiBase.extend({
  end_user: EndUserSchema.nullable().optional(),
  feature: FeatureSchema.nullable().optional(),
})

export const StoryLikeSchema = strapiBase.extend({
  end_user: EndUserSchema.nullable().optional(),
  story: StorySchema.nullable().optional(),
})

export type StrapiImage = z.infer<typeof StrapiImageSchema>
export type Reaction = z.infer<typeof ReactionSchema>
export type IdeaStatus = z.infer<typeof IdeaStatusSchema>
export type EndUser = z.infer<typeof EndUserSchema>
export type PopulatedLike = z.infer<typeof PopulatedLikeSchema>
export type NestedFeature = z.infer<typeof NestedFeatureSchema>
export type Idea = z.infer<typeof IdeaSchema>
export type Feature = z.infer<typeof FeatureSchema>
export type Story = z.infer<typeof StorySchema>
export type IdeaLike = z.infer<typeof IdeaLikeSchema>
export type FeatureLike = z.infer<typeof FeatureLikeSchema>
export type StoryLike = z.infer<typeof StoryLikeSchema>

const PaginationSchema = z.object({
  page: z.number(),
  pageCount: z.number(),
  pageSize: z.number(),
  total: z.number(),
})

export const strapiCollection = <T extends z.ZodType>(schema: T) =>
  z.object({
    data: z.array(schema),
    meta: z.object({ pagination: PaginationSchema }),
  })

export const strapiSingle = <T extends z.ZodType>(schema: T) =>
  z.object({
    data: schema,
    meta: z.object({}),
  })
