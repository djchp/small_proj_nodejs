import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "not your account"));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user deleted ");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "not your account to delete"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    next(error);
  }
};
export const subscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: {subscribedCh: req.params.id}
    })
    await User.findByIdAndUpdate(req.params.id, {
      $inc: {subs: 1}
    })
    res.status(200).json("subbed")
  } catch (error) {
    next(error);
  }
};
export const unsubUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {subscribedCh: req.params.id}
    })
    await User.findByIdAndUpdate(req.params.id, {
      $inc: {subs: -1}
    })
    res.status(200).json("unsubbed")
  } catch (error) {
    next(error);
  }
};
export const like = async (req, res, next) => {
  const id = req.user.id
  const videoId = req.params.videoId
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: {likes: id}, 
      $pull: {dislikes: id}
    })
    res.status(200).json("video liked")
  } catch (error) {
    next(error);
  }
};
export const dislike = async (req, res, next) => {
  const id = req.user.id
  const videoId = req.params.videoId
  console.log(req.params)
  try {
    await Video.findByIdAndDelete(videoId, {
      $addToSet: {dislikes: id}, 
      $pull: {likes: id}
    })
    res.status(200).json("video disliked")
  } catch (error) {
    next(error);
  }
};
