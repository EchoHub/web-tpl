import { Model } from 'dva';
import { delay } from '@/public/utils';
const matchPathName = function (menus: any[], pathname: string): any {
  let defaultOpenKey, defaultSelectedKey;
  if (!menus || !menus.length) return {}
  for (const item of menus) {
    const { children, value, href } = item;
    if (href === pathname) {
      defaultSelectedKey = value;
      break;
    } else {
      defaultOpenKey = value;
      defaultSelectedKey = matchPathName(children, pathname).defaultSelectedKey;
    }
  }
  return {
    defaultOpenKey,
    defaultSelectedKey
  }
}
export default {
  namespace: 'global',
  state: {
    userInfo: {},
    menus: [],
    defaultOpenKeys: [],
    defaultSelectedKeys: []
  },
  effects: {
    *fetchMenus({ payload }, { put, call }) {
      yield call(delay, 100);
      const menus = [
        {
          icon: 'mail',
          label: '表格样例',
          value: '1',
          href: '/house/demo/table',
        },
        {
          icon: 'appstore',
          label: '详情样例',
          value: '2',
          href: '/house/demo/detail',
        },
        {
          icon: 'setting',
          label: '一级菜单 3',
          value: '3',
          children: [
            {
              label: '二级菜单 3-1',
              value: '31',
              href: '/house/demo/detail1',
            },
            {
              label: '二级菜单 3-2',
              value: '32',
              href: '/house/demo/detail2',
            }
          ]
        }
      ];
      yield put({ type: 'setMenus', payload: menus });
      if (payload) yield put({ type: 'setDefaultMenus', payload });
    },
  },
  reducers: {
    /**
     * 设置默认展开的菜单项
     * @param state 
     * @param param1 
     */
    setDefaultMenus(state, { payload }: any) {
      const { menus } = state;
      const { defaultOpenKey, defaultSelectedKey } = matchPathName(menus, payload);
      state.defaultOpenKeys = defaultOpenKey ? [defaultOpenKey] : [];
      state.defaultSelectedKeys = defaultSelectedKey ? [defaultSelectedKey] : [];
      return state;
    },
    setMenus(state, { payload }: any) {
      state.menus = payload;
      return state;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'fetchMenus',
          payload: pathname
        })
      });
    },
  }
} as Model

