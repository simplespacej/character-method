import { Character, Bowman, Swordsman, Magician, Daemon, Undead, Zombie } from './character';

describe('Character class tests', () => {
    test('Создание персонажа с некорректным именем', () => {
        expect(() => new Character('A', 'Bowman')).toThrow('Имя должно содержать от 2 до 10 символов');
    });

    test('Создание персонажа с некорректным типом', () => {
        expect(() => new Character('Archer', 'Archer')).toThrow('Некорректный тип персонажа');
    });

    test('Создание персонажа с корректными данными', () => {
        const bowman = new Bowman('Robin');
        expect(bowman.name).toBe('Robin');
        expect(bowman.type).toBe('Bowman');
        expect(bowman.health).toBe(100);
        expect(bowman.level).toBe(1);
        expect(bowman.attack).toBe(25);
        expect(bowman.defence).toBe(25);
    });

    test('Проверка уровня персонажа', () => {
        const bowman = new Bowman('Robin');
        bowman.levelUp();
        expect(bowman.level).toBe(2);
        expect(bowman.attack).toBe(30); // 25 * 1.2 = 30
        expect(bowman.defence).toBe(30); // 25 * 1.2 = 30
        expect(bowman.health).toBe(100);
    });

    test('Проверка урона', () => {
        const swordsman = new Swordsman('Arthur');
        swordsman.damage(20);
        expect(swordsman.health).toBe(82); // 100 - 20 * (1 - 10/100) = 82
        swordsman.damage(100);
        expect(swordsman.health).toBe(0); // Урон больше, чем здоровье
    });

    test('Попытка повышения уровня умершего персонажа', () => {
        const magician = new Magician('Merlin');
        magician.damage(100); // Убиваем персонажа
        expect(() => magician.levelUp()).toThrow('Нельзя повысить левел умершего');
    });

    test('Проверка работы всех типов персонажей', () => {
        const characters = [
            new Bowman('Robin'),
            new Swordsman('Arthur'),
            new Magician('Merlin'),
            new Daemon('Lucifer'),
            new Undead('ZombieKing'),
            new Zombie('Walker')
        ];

        expect(characters[0].type).toBe('Bowman');
        expect(characters[1].type).toBe('Swordsman');
        expect(characters[2].type).toBe('Magician');
        expect(characters[3].type).toBe('Daemon');
        expect(characters[4].type).toBe('Undead');
        expect(characters[5].type).toBe('Zombie');
    });
});
