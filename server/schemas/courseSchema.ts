import { z } from "zod";

const reviewBodySchema = z.object({
  user: z.object({
    name: z.string(),
    rating: z.number(),
    comment: z.string(),
    commentReplies: z.array(
      z.object({
        user: z.object({
          name: z.string(),
        }),
        rating: z.number(),
        comment: z.string(),
      })
    ),
  }),
});

const linkBodySchema = z.object({
  title: z.string(),
  url: z.string(),
});

const commentBodySchema = z.object({
  user: z.object({
    name: z.string(),
  }),
  comment: z.string(),
  commentReplies: z.array(
    z.object({
      user: z.object({
        name: z.string(),
      }),
      comment: z.string(),
    })
  ),
});

const courseDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  links: z.array(linkBodySchema),
  suggestion: z.string(),
  questions: z.array(commentBodySchema),
});

const courseSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  estimatedPrice: z.number().optional(),
  thumbnail: z.object({
    public_id: z.string().optional(),
    url: z.string().optional(),
  }),
  tags: z.string(),
  level: z.string(),
  demoUrl: z.string(),
  benefits: z.array(
    z.object({
      title: z.string(),
    })
  ),
  prerequisites: z.array(
    z.object({
      title: z.string(),
    })
  ),
  reviews: z.array(reviewBodySchema),
  courseData: z.array(courseDataSchema),
  ratings: z.number().optional(),
});

export const CourseSchema = z.object({
  body: courseSchema,
});

const courseUpdateBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  estimatedPrice: z.number().optional(),
  thumbnail: z
    .object({
      public_id: z.string().optional(),
      url: z.string().optional(),
    })
    .optional(),
  tags: z.string().optional(),
  level: z.string().optional(),
  demoUrl: z.string().optional(),
  benefits: z
    .array(
      z.object({
        title: z.string(),
      })
    )
    .optional(),
  prerequisites: z
    .array(
      z.object({
        title: z.string(),
      })
    )
    .optional(),
  reviews: z.array(reviewBodySchema).optional(),
  courseData: z.array(courseDataSchema).optional(),
  ratings: z.number().optional(),
});

export const CourseUpdateSchema = z.object({
  body: courseUpdateBodySchema,
});
