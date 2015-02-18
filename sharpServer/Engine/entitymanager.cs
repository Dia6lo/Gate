using System;
using System.Collections.Generic;
using System.Linq;

namespace SharpServer.Engine
{
    // SUGGESTION: Transform it to system?
    // TODO: make it use data from DB
    internal class EntityManager
    {
        private Dictionary<string, Dictionary<int, Component>> componentStore;
        private Dictionary<int, string> entityHumanReadableNames;
        private List<int> entityStore;
        private int lowestUnassignedEntityID;

        public EntityManager()
        {
            lowestUnassignedEntityID = 1;
            entityStore = new List<int>();
            componentStore = new Dictionary<string, Dictionary<int, Component>>();
            entityHumanReadableNames = new Dictionary<int, string>();
        }

        public void addComponent<T>(int entity, T component) where T : Component
        {
            Dictionary<int, Component> store;
            if (!componentStore.TryGetValue(typeof(T).Name, out store))
            {
                store = new Dictionary<int, Component>();
                componentStore[typeof(T).Name] = store;
            }
            store[entity] = component;
        }

        public void addComponents(int entity, params Component[] components)
        {
            foreach (var component in components)
            {
                this.addComponent(entity, component);
            }
        }

        public int createEntity(string name = "No description")
        {
            var entity = generateNewEntityID();
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

        public void destroyEntities(params int[] entities)
        {
            foreach (var entity in entities)
                destroyEntity(entity);
        }

        // TODO: Make it synchronous
        public void destroyEntity(int entity)
        {
            if (!entityStore.Contains(entity))
                return;
            entityStore.Remove(entity);
            foreach (var componentType in componentStore)
            {
                componentStore[componentType.Key].Remove(entity);
            }
        }

        public T[] getAllComponentsOfType<T>() where T : Component
        {
            return componentStore[typeof(T).Name]
                .Values
                .Cast<T>()
                .ToArray();
        }

        // WARNING: Use only for debug reasons (slow as fuck)
        public T[] getAllComponentsOnEntity<T>(int entity) where T : Component
        {
            var components = new List<T>();
            foreach (var componentType in componentStore)
            {
                if (componentStore[componentType.Key].ContainsKey(entity))
                    components.Add((T)componentStore[componentType.Key][entity]);
            }
            return components.ToArray();
        }

        public int[] getAllEntitiesPossessingComponent<T>() where T : Component
        {
            return componentStore[typeof(T).Name]
                .Keys
                .ToArray();
        }

        public T getComponent<T>(int entity) where T : Component
        {
            Dictionary<int, Component> store;
            if (!componentStore.TryGetValue(typeof(T).Name, out store))
                throw new KeyNotFoundException("GET FAIL: there are no entities with a Component of class: " + typeof(T).Name);
            if (!store.ContainsKey(entity))
                throw new KeyNotFoundException("GET FAIL: " + nameFor(entity) + "(ID: " + entity + ") does not possess Component: " + typeof(T).Name);
            return (T)store[entity];
        }

        public bool hasComponent<T>(int entity) where T : Component
        {
            Dictionary<int, Component> store;
            if (componentStore.TryGetValue(typeof(T).Name, out store))
                return store.ContainsKey(entity);
            return false;
        }

        public string nameFor(int entity)
        {
            if (entityHumanReadableNames.ContainsKey(entity))
                return entityHumanReadableNames[entity];
            return "Not defined";
        }

        public void removeComponent<T>(int entity) where T : Component
        {
            Dictionary<int, Component> store;
            if (componentStore.TryGetValue(typeof(T).Name, out store))
                store.Remove(entity);
        }

        public void setEntityName(int entity, string name)
        {
            entityHumanReadableNames[entity] = name;
        }

        // SUGGESTION: Think about better implementation
        // TODO: Make it synchronous
        private int generateNewEntityID()
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