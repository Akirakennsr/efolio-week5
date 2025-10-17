/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions}= require("firebase-functions");
const {onRequest}= require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");

admin.initializeApp();
const db = admin.firestore();

const sgMail = require("@sendgrid/mail");
const functionsModule = require("firebase-functions");
const SENDGRID_KEY = (functionsModule &&
  functionsModule.sendgrid &&
  functionsModule.sendgrid.key) ||
  process.env.SENDGRID_API_KEY;
if (SENDGRID_KEY) sgMail.setApiKey(SENDGRID_KEY);

exports.sendEmail = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        error: "Method Not Allowed. Use POST."});
    }
    const body = req.body || {};
    const to = "zqia0019@student.monash.edu";
    const from = "qianzehao01@gmail.com";
    const subject = typeof
    body.subject === "string" && body.subject.trim() ?
    body.subject.trim() : null;
    const text = typeof body.text === "string" ?
    body.text : "";
    const html = typeof body.html === "string" ?
    body.html : null;
    const attachments = Array.isArray(body.attachments) ?
    body.attachments : [];
    if (!subject) {
      return res.status(400).json({
        success: false, error: "Missing subject"});
    }
    const msg = {
      to,
      from,
      subject,
      text,
    };
    if (html) msg.html = html;
    if (attachments.length) {
      try {
        msg.attachments = attachments.map((att) => {
          let content = att.content || "";
          if (typeof content !== "string") content = "";
          const m = content.match(/^data:([\w/+.-]+);base64,(.*)$/);
          if (m) content = m[2];
          return {
            content: content,
            filename: att.filename || "attachment",
            type: att.type || undefined,
            disposition: "attachment",
          };
        });
      } catch (err) {
        console.error("attachment parse error", err);
        return res.status(400).json({
          success: false, error: "Invalid attachments"});
      }
    }
    try {
      if (!SENDGRID_KEY) {
        console.error("SENDGRID_API_KEY not configured");
        return res.status(500).json({
          success: false, error: "Mail service not configured"});
      }
      await sgMail.send(msg);
      console.log("Email sent");
      return res.status(200).json({
        success: true, message: "Email sent"});
    } catch (error) {
      console.error("sendEmail error", error && (error.response || error));
      const errMsg = (error && error.message) ||
      (error && error.toString && error.toString()) ||
      "Error sending email";
      return res.status(500).json({
        success: false, error: errMsg});
    }
  });
});


exports.supportProject = onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({
        ok: false, error: "Method Not Allowed"});
    }
    const {projectId} = req.body || {};
    if (!projectId) {
      return res.status(400).json({
        ok: false, error: "Missing projectId"});
    }
    const projectRef = db.collection("donationProjects")
        .doc(projectId.toString());
    try {
      // Use transaction to ensure atomic increment and to return new value
      const result = await db.runTransaction(async (tx) => {
        const snap = await tx.get(projectRef);
        if (!snap.exists) throw new Error("Project not found");
        const data = snap.data() || {};
        const prev = typeof data.supportCount === "number" ?
        data.supportCount : 0;
        const next = prev + 1;
        tx.update(projectRef, {supportCount: next});
        return next;
      });

      return res.status(200).json({
        ok: true, projectId, supportCount: result});
    } catch (err) {
      logger.error("supportProject error:", err && err.stack ?
        err.stack : err);
      const msg = err && err.message ? err.message : err;
      return res.status(500).json({ok: false, error: msg});
    }
  });
});


exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await admin.firestore().collection("books").get();
      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(books);
    } catch (error) {
      res.status(500).send("Error fetching books");
    }
  });
});

exports.capitalizeBookFields = onDocumentCreated(
    "books/{bookId}",
    async (event) => {
      const snap = event.data;
      if (!snap) return;
      const data = snap.data();
      const bookId = snap.id;
      const newData = {};
      for (const key in data) {
        if (typeof data[key] === "string") {
          newData[key] = data[key].toUpperCase();
        } else {
          newData[key] = data[key];
        }
      }
      await admin.firestore().collection("books").doc(bookId).update(newData);
    });


exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = await admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const bookCount = snapshot.size;
      res.status(200).send({bookCount});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });
});


// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
