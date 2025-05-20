export type Creature = {
  power: number;
  toughness: number;
  plusOneCounters: number;
};

export type Trigger = CreatureEtbTrigger | EvolveTrigger | CopyTrigger;

export interface CreatureEtbTrigger {
  kind: "creatureEtbTrigger";
  creature: Creature;
};

export interface EvolveTrigger {
  kind: "evolveTrigger";
  stagId: string;
}

export interface CopyTrigger {
  kind: "copyTrigger";
  stagId: string
}
