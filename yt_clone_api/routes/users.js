import express from 'express'
import {updateUser, deleteUser, subscribeUser, unsubUser, like, dislike, getUser} from '../controllers/user.js'
import {verifyUser} from '../verifyUser.js'

const router = express.Router()


router.put("/:id", verifyUser, updateUser)

router.delete("/:id", verifyUser, deleteUser)

router.get("/find/:id", getUser)

router.put("/sub/:id", verifyUser, subscribeUser)

router.put("/unsub/:id", verifyUser, unsubUser)

router.put("/like/:videoId", verifyUser, like)

router.put("/unlike/:videoId", verifyUser, dislike)


export default router