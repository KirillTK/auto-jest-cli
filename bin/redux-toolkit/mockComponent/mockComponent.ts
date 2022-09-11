import { getCommandArgumentByName } from '../../core/utils';
import { ArgumentEnum } from '../../core/enum';
import { FileSystemUtils } from '../../core/utils';

export class MockComponent {

  private generateTestTemplate = (componentName: string, mockStore: boolean): string => {

    return '';
  };

  mockComponent = async (): Promise<void> => {
    const componentFileName = getCommandArgumentByName<string>(ArgumentEnum.COMPONENT);
    const mockStore = !!getCommandArgumentByName<string>(ArgumentEnum.MOCK_STORE);

    try {
      const exportedComponent = await FileSystemUtils.getComponentExport(componentFileName);

      if (!exportedComponent) {
        throw Error('No exports found!');
      }

      this.generateTestTemplate(exportedComponent, mockStore);

    } catch (error) {
      console.error(error);
    }
  };
}
