/**
 * @openapi
 * /api/posts:
 *   get:
 *     tags: [Blog]
 *     summary: Retrieve a list of blog posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of posts.
 *   post:
 *     tags: [Blog]
 *     summary: Create a new blog post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *     responses:
 *       201:
 *         description: Post created successfully.
 */

/**
 * @openapi
 * /api/posts/{postId}:
 *   get:
 *     tags: [Blog]
 *     summary: Get a post by ID
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Post details.
 */
