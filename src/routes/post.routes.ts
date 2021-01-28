import express from "express";

const router = express.Router();
import Post from "../models/Post";
router.get("/", async (req: any, res: any) => {
    let posts: any = null;
    try {
        posts = await Post.find().populate("auth");
    } catch (err) {
        console.log(err);
        posts = [];
    }
    return res.render("pages/posts", {posts});
});

router.get("/:stub", async (req: any, res: any) => {
    let valid = true;
    const stubs = req.params.stub.split(".");
    const stub = stubs[stubs.length - 1];
    let post: any = null;
    try {
        post = await Post.findOne({_id: stub}).populate("author");
    } catch (err) {
        console.log(err);
        post = {};
        valid = false;
    }
    return res.render("pages/post", {valid, post});
});

export default router;