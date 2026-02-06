/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - fullname
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: sandeep
 *               fullname:
 *                 type: string
 *                 example: Sandeep Sinha
 *               email:
 *                 type: string
 *                 format: email
 *                 example: sandeep@google.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Sandeep@2026
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string }
 *                 data: { type: object }
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Internal server error
 */
