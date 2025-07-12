import GameInRoom from "./GameInRoom"

export default async function Room({ params }) {
  const { roomId } = await params

  return (
    <GameInRoom roomId={roomId}/>
  )
}
