import Table from '../Table';
import $ from 'miaoxing';
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import {createPromise} from '@mxjs/test';

describe('table', () => {
  test('column', async () => {
    const {container} = render(<Table
      request={async () => {
        return {
          data: [
            {
              id: 1,
              name: '内容',
            },
          ],
          page: 1,
          success: true,
          total: 1,
        };
      }}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
        },
      ]}
    />);

    expect(container.querySelector('th').innerHTML).toBe('名称');

    await waitForElementToBeRemoved(container.querySelector('.ant-empty'));
  });

  test('url', async () => {
    const promise = createPromise();
    $.get = jest.fn().mockImplementationOnce(() => promise.resolve({
      ret: {
        data: [
          {
            id: 1,
            name: '内容',
          },
        ],
      },
    }));

    const {container} = render(<Table
      url="test"
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
        },
      ]}
    />);

    await promise;
    expect($.get).toHaveBeenCalledWith('test?page=1&limit=20');

    await waitForElementToBeRemoved(container.querySelector('.ant-empty'));
    const cell = await screen.queryByText('内容');
    expect(cell).not.toBeNull();
  });
});
