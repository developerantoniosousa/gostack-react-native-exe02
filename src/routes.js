import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import repositories from '~/pages/repositories';
import issues from '~/pages/issues';

export default createAppContainer(
  createSwitchNavigator({
    repositories,
    issues,
  }),
);
