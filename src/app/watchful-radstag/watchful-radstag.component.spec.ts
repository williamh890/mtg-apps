import { WatchfulRadstagComponent } from './watchful-radstag.component';
import { CreatureEtbTrigger } from './watchful-radstag.model';

describe('WatchfulRadstagComponent', () => {
  let component: WatchfulRadstagComponent;

  it('should create', () => {
    component = new WatchfulRadstagComponent();
    expect(component).toBeTruthy();
  });

  it('should have default stags created', () => {
    component = new WatchfulRadstagComponent();
    component.ngOnInit();
    expect(Object.values(component.stags).length === 1).toBeTruthy();
  });

  it('should get correct evolve triggers', () => {
    component = new WatchfulRadstagComponent();
    component.ngOnInit();

    const etbTrigger = <CreatureEtbTrigger>{
      kind: 'creatureEtbTrigger',
      creature: {
        power: 4,
        toughness: 4,
        plusOneCounters: 0,
      }
    };

    let triggers = component.getEvolveTriggersFromStags(component.stags, etbTrigger);
    expect(triggers.length === 1).toBeTruthy();


    const stags = {
      1: component.defaultStag(),
      2: component.defaultStag(),
      3: {
        power: 2,
        toughness: 2,
        plusOneCounters: 1,
      },
      4: {
        power: 2,
        toughness: 2,
        plusOneCounters: 2,
      },
      5: {
        power: 4,
        toughness: 4,
        plusOneCounters: 0,
      },
      6: {
        power: 2,
        toughness: 4,
        plusOneCounters: 1,
      },
      7: {
        power: 4,
        toughness: 2,
        plusOneCounters: 1,
      },
    };

    triggers = component.getEvolveTriggersFromStags(stags, etbTrigger);

    const triggerTypes = new Set(triggers.map(t => t.kind));
    expect(triggerTypes.size === 1 && triggerTypes.has('evolveTrigger')).toBeTruthy();

    const triggerIds = triggers.map(t => t.stagId);
    expect(equal(triggerIds, ['1', '2', '3', '6', '7'])).toBeTruthy();
  })

  it('should have correct end state when 4/4 enters', () => {
    component = new WatchfulRadstagComponent();
    component.ngOnInit();

    const etbTrigger = <CreatureEtbTrigger>{
      kind: 'creatureEtbTrigger',
      creature: {
        power: 4,
        toughness: 4,
        plusOneCounters: 0,
      }
    };
    component.magicEngine([etbTrigger]);
    let stags = Object.values(component.stags);
    expect(stags.length === 2).toBeTruthy();

    component.magicEngine([etbTrigger]);
    stags = Object.values(component.stags);
    expect(stags.length === 4).toBeTruthy();

    component.magicEngine([etbTrigger]);
    stags = Object.values(component.stags);
    expect(stags.length === 7).toBeTruthy();

    component.magicEngine([etbTrigger]);
    stags = Object.values(component.stags);
    expect(stags.length === 12).toBeTruthy();
  })

  it('should have correct end state when multiple 4/4s enters', () => {
    component = new WatchfulRadstagComponent();
    component.ngOnInit();

    const etbTrigger = <CreatureEtbTrigger>{
      kind: 'creatureEtbTrigger',
      creature: {
        power: 4,
        toughness: 4,
        plusOneCounters: 0,
      }
    };
    component.magicEngine([etbTrigger, etbTrigger, etbTrigger]);
    let stags = Object.values(component.stags);
    expect(stags.length === 7).toBeTruthy();
  })
});


function equal(a: any[], b: any[]): boolean {
  if (!Array.isArray(a) || !Array.isArray(b)) return a === b
  if (a.length !== b.length) return false

  return a.every((item, i) => equal(item, b[i]))
}
