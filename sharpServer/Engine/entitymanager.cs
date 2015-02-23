using System;
using System.Collections.Generic;
using System.Linq;

namespace SharpServer.Engine
{
    using ComponentStore = Dictionary<int, Component>;

    // SUGGESTION: Transform it to service?
    // TODO: make it use data from DB
    internal static class EntityManager
    {
        private static Dictionary<string, ComponentStore> componentDB = new Dictionary<string, ComponentStore>();
        private static Dictionary<int, string> entityHumanReadableNames = new Dictionary<int, string>();
        private static List<int> entityStore = new List<int>();
        private static int lowestUnassignedEntityID = 1;

        public static void AddComponent<T>(int entity, T component) where T : Component
        {
            ComponentStore store;
            if (!componentDB.TryGetValue(typeof(T).Name, out store))
            {
                store = new ComponentStore();
                componentDB[typeof(T).Name] = store;
            }
            store[entity] = component;
        }

        public static void AddComponents(int entity, params Component[] components)
        {
            foreach (var component in components)
            {
                AddComponent(entity, component);
            }
        }

        public static int CreateEntity(string name = "No description")
        {
            var entity = GenerateNewEntityID();
            if (entity < 1)
            {
                throw new ArgumentOutOfRangeException("WTF? Entity < 1");
            }
            else
            {
                entityStore.Add(entity);
                entityHumanReadableNames[entity] = name;
                return entity;
            }
        }

        public static void DestroyEntities(params int[] entities)
        {
            foreach (var entity in entities)
                DestroyEntity(entity);
        }

        // TODO: Make it synchronous
        public static void DestroyEntity(int entity)
        {
            if (!entityStore.Contains(entity))
                return;
            entityStore.Remove(entity);
            foreach (var componentType in componentDB)
            {
                componentDB[componentType.Key].Remove(entity);
            }
        }

        public static T[] GetAllComponentsOfType<T>() where T : Component
        {
            return componentDB[typeof(T).Name]
                .Values
                .Cast<T>()
                .ToArray();
        }

        // WARNING: Use only for debug reasons (slow as fuck)
        public static T[] GetAllComponentsOnEntity<T>(int entity) where T : Component
        {
            var components = new List<T>();
            foreach (var componentType in componentDB)
            {
                if (componentDB[componentType.Key].ContainsKey(entity))
                    components.Add((T)componentDB[componentType.Key][entity]);
            }
            return components.ToArray();
        }

        public static int[] GetAllEntitiesPossessingComponent<T>() where T : Component
        {
            return componentDB[typeof(T).Name]
                .Keys
                .ToArray();
        }

        public static T GetComponent<T>(int entity) where T : Component
        {
            ComponentStore store;
            if (!componentDB.TryGetValue(typeof(T).Name, out store))
                throw new KeyNotFoundException("GET FAIL: there are no entities with a Component of class: " + typeof(T).Name);
            if (!store.ContainsKey(entity))
                throw new KeyNotFoundException("GET FAIL: " + NameFor(entity) + "(ID: " + entity + ") does not possess Component: " + typeof(T).Name);
            return (T)store[entity];
        }

        public static bool HasComponent<T>(int entity) where T : Component
        {
            ComponentStore store;
            if (componentDB.TryGetValue(typeof(T).Name, out store))
                return store.ContainsKey(entity);
            return false;
        }

        public static string NameFor(int entity)
        {
            if (entityHumanReadableNames.ContainsKey(entity))
                return entityHumanReadableNames[entity];
            return "Not defined";
        }

        public static void RemoveComponent<T>(int entity) where T : Component
        {
            ComponentStore store;
            if (componentDB.TryGetValue(typeof(T).Name, out store))
                store.Remove(entity);
        }

        public static void SetEntityName(int entity, string name)
        {
            entityHumanReadableNames[entity] = name;
        }

        // SUGGESTION: Think about better implementation
        // TODO: Make it synchronous
        private static int GenerateNewEntityID()
        {
            if (lowestUnassignedEntityID < int.MaxValue)
            {
                return lowestUnassignedEntityID++;
            }
            else
            {
                for (var i = 1; i < int.MaxValue; i++)
                {
                    if (!entityStore.Contains(i))
                        return i;
                }
                throw new ArgumentOutOfRangeException("ERROR: no available Entity IDs; too many entities!");
            }
        }
    }
}