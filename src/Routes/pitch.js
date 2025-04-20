const express = require('express');
const multer = require('multer');
const { db, bucket, admin } = require('../firebase');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/create",
  upload.fields([{ name: 'video', maxCount: 1 }, { name: 'photo0' }, { name: 'photo1' }, { name: 'photo2' }]),
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const idToken = authorization.split("Bearer ")[1];
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;

      const {
        title,
        category,
        description,
        problem,
        solution,
        marketSize,
        businessModel,
        competitiveAdvantage,
        funding
      } = req.body;

      // Upload video
      let videoUrl = "";
      if (req.files['video']?.[0]) {
        const videoFile = req.files['video'][0];
        const videoRef = bucket.file(`pitches/${uid}/videos/${Date.now()}_${videoFile.originalname}`);
        await videoRef.save(videoFile.buffer, {
          metadata: { contentType: videoFile.mimetype },
        });
        videoUrl = await videoRef.getSignedUrl({ action: 'read', expires: '03-01-2500' });
        videoUrl = videoUrl[0];
      }

      // Upload photos
      let photoUrls = [];
      for (let i = 0; i < 3; i++) {
        const file = req.files[`photo${i}`]?.[0];
        if (!file) continue;

        const photoRef = bucket.file(`pitches/${uid}/photos/${Date.now()}_${file.originalname}`);
        await photoRef.save(file.buffer, {
          metadata: { contentType: file.mimetype },
        });
        const url = await photoRef.getSignedUrl({ action: 'read', expires: '03-01-2500' });
        photoUrls.push(url[0]);
      }

      // Save pitch in Firestore
      const newPitch = {
        userId: uid,
        title,
        category,
        description,
        problem,
        solution,
        marketSize,
        businessModel,
        competitiveAdvantage,
        funding,
        videoUrl,
        photoUrls,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await db.collection("pitches").add(newPitch);

      res.status(200).json({ success: true, pitchId: docRef.id });
    } catch (error) {
      console.error("Pitch upload error:", error);
      res.status(500).json({ error: "Something went wrong." });
    }
  }
);

module.exports = router;
