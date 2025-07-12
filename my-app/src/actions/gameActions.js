"use server"
import { pusherServer } from "@/lib/pusher";

export async function startNewGame(roomId) {
  pusherServer.trigger(`game-${roomId}`, "new-game", {});
}