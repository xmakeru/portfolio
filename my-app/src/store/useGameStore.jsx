import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { nanoid } from 'nanoid';

export const useGameStore = create(
  devtools(
    persist(
      (set, get) => ({
        rooms: [],
        players: [],
        currentPlayerId: null, // ID текущего игрока

         createRoom: (roomId) => {
          set((state) => ({
            rooms: {
              ...state.rooms,
              [roomId]: {
                id: roomId,
                status: 'waiting',
                rounds: 3,
                currentRound: null,
                currentRoundNumber: 0,
                words: [],
                usedWords: []
              }
            },
          }));
          return roomId;
        },

        // Получает текущего игрока
        getCurrentPlayer: () => {
          const state = get()
          return state.players.find(player => player.id === state.currentPlayerId)
        },

        // Добавляет игрока или изменяет имя текущего
        addPlayer: (playerName) => {
          const state = get()
          
          // Если есть текущий игрок, изменяем его имя
          if (state.currentPlayerId) {
            set((state) => ({
              players: state.players.map(player => 
                player.id === state.currentPlayerId 
                  ? { ...player, name: playerName }
                  : player
              )
            }))
            return state.currentPlayerId
          } else {
            // Если нет текущего игрока, создаем нового
            const newPlayerId = nanoid()
            set((state) => ({
              players: [...state.players, {
                id: newPlayerId,
                name: playerName,
                score: 0,
              }],
              currentPlayerId: newPlayerId
            }))
            return newPlayerId
          }
        },

        // Очищает весь стор
        clearStore: () => {
          set({ rooms: [], players: [], currentPlayerId: null })
        }
      }),
      {
        name: "game-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    {store: 'gameStore'}
  )
)
