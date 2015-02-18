using System;
using System.Collections.Generic;

namespace SharpServer.Engine.Systems
{
    internal class PlayerSystem
    {
        private Dictionary<int, int> players;

        private int lowestUnassignedPlayerID;
        private EntityManager entityManager; 
        private WorldSystem worldSystem; 
        private MovementSystem movementSystem;

        public PlayerSystem(EntityManager entityManager, WorldSystem worldSystem, MovementSystem movementSystem)
        {
            players = new Dictionary<int, int>();
            //this._io = SocketServer();
            lowestUnassignedPlayerID = 1;
            //this._io.on('connection', this._onPlayerConnect.bind(this));
            //this._io.listen(8080)
            Console.WriteLine("Server started on 8080");
        }

        private int generateNewPlayerID()
        {
            //TODO: Make it synchronous
            {
                if (lowestUnassignedPlayerID < int.MaxValue)
                {
                    return lowestUnassignedPlayerID++;
                }
                else
                {
                    for (var i = 1; i < int.MaxValue; i++)
                    {
                        if (!players.ContainsKey(i))
                            return i;
                    }
                    throw new IndexOutOfRangeException("ERROR: no available Player IDs; too many players(wow)!");
                }
            }
        }

        /*void onPlayerConnect(socket: SocketIO.Socket) {
            var playerInfo = this.initializePlayer();
            var playerId = playerInfo.id;
            console.log("connected player " + playerId.toString());
            this._io.emit('new_player', JSON.stringify(playerInfo));
            socket.emit('map', JSON.stringify(this.getMap(playerId)));
            socket.on('disconnect', this._onPlayerDisconnect.bind(this, playerId));
            socket.on("move", this._onPlayerMove.bind(this, playerId));
        }

        private _onPlayerDisconnect(playerId: number) {
            console.log('disconnected player ' + playerId.toString());
            this._io.emit('player_exit', JSON.stringify(this.destroyPlayer(playerId)));
        }

        private _onPlayerMove(data, playerId: number) {
            var moving = this.movePlayer(playerId, data);
            if (moving.moved) {
                var update = { id: moving.id, destination: moving.destination };
                this._io.emit('map_update', JSON.stringify(update));
            }
        }

        initializePlayer(): { id: number; position: Vector2 } {
            do {
                var x = Math.floor((Math.random() * 18) + 1);
                var y = Math.floor((Math.random() * 8) + 1);
            } while (this._worldSystem.tiles[x][y].volume > 50);
            var position = new Vector2(x, y);
            var id = this._generateNewPlayerID();
            if (id < 1) {
                throw new Error("WTF? PlayerID < 1");
            }
            var player = PlayerFactory.new(this._entityManager, id, position);
            this._players[id] = player;
            this._worldSystem.addEntity(new Vector2(x, y), player);
            return { id: id, position: new Vector2(x, y) };
        }

        destroyPlayer(id: number): { id: number; position: Vector2 } {
            var player = this._players[id]
            var position = this._entityManager.getComponent(player, Transform).position;
            this._worldSystem.removeEntity(player);
            this._entityManager.destroyEntity(player);
            this._players[id] = undefined;
            return { id: id, position: position };
        }

        movePlayer(id: number, direction: string): { id: number; moved: boolean; destination: Vector2 } {
            var player = this._players[id];
            if (player == undefined)
                return;
            var offset = this._getOffset(direction);
            var position = this._entityManager.getComponent(player, Transform).position;
            var destination = position.combine(offset);
            if (this._movementSystem.moveEntity(player, destination))
                return { id: player, moved: true, destination: destination };
            return { id: player, moved: false, destination: destination };
        }

        private _getOffset(direction: string): Vector2 {
            var movement = new Vector2(0, 0);
            switch (direction) {
                case ("left"):
                    movement.x = -1
                    break;

                case ("up"):
                    movement.y = -1
                    break;

                case ("right"):
                    movement.x = 1
                    break;

                case ("down"):
                    movement.y = 1
                    break;
            }
            return movement;
        }

        getMap(id: number): { floorType: string; entities: { entity: number; type: string }[] }[][] {
            var world = this._worldSystem;
            var player = this._players[id];
            var output: { floorType: string; entities: { entity: number; type: string }[] }[][] = []
            for (var x = 0; x < world.settings.tilesX; x++) {
                output[x] = [];
                for (var y = 0; y < world.settings.tilesY; y++) {
                    var tile = world.tiles[x][y];
                    var entities: { entity: number; type: string }[] = [];
                    for (var i = 0; i < tile.entities.length; i++)
                    {
                        var entity = tile.entities[i];
                        entities.push({ entity: entity, type: this._entityManager.getComponent(entity, Render).type });
                    }
                    output[x][y] = { floorType: tile.floorType, entities: entities };
                }
            }
            return output;
        }*/
    }
}