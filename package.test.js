  const packageJson = require('./package.json');

  describe('Package JSON', () => {
    test('has a name property', () => {
      expect(packageJson).toHaveProperty('name');
    });

    test('has a version property', () => {
      expect(packageJson).toHaveProperty('version');
    });

    test('has a description property', () => {
      expect(packageJson).toHaveProperty('description');
    });

  });