<script>
  // 54px (header) + 71px for each row for exact rows before scrolling
  // Example: 3 rows = 267px (54 + (71 x 3))
  import Checkbox from '../checkbox/Checkbox.svelte';
  import OrderStatusLabel from '../OrderStatusLabel/OrderStatusLabel.svelte';
  import Icon from '../icon/Icon.svelte';
  import Label from '../label/Label.svelte';
  import { formatDate } from '../../tools/tools.ts';
  import moment from 'moment';
  import NavItem from '../navitem/NavItem.svelte';
  import Dropdown from '../Dropdown/Dropdown.svelte';
  import Input from '../input/Input.svelte';
  import { values } from 'lodash';

  export let headers = [];
  export let data = [];
  export let height = undefined;
  export let headerHeight = 0;

  export let handleDelete = undefined;
  export let handleDeleteSelected = undefined;
  export let handleCheck = undefined;
  export let selected = [];

  export let removeTruckFromTeam = undefined;
  export let truckOpts = undefined;
  export let managerOpts = undefined;
  export let handleSelectTruck = undefined;
  export let handleSelectManager = undefined;
  export let role = undefined;

  function getHeaderSize(size) {
    if (size === 'small') {
      return 'uk-width-1-6';
    } else if (size === 'medium') {
      return 'uk-width-1-4';
    } else if (size === 'large') {
      return 'uk-width-1-3 ';
    } else if (size === 'expand') {
      return 'uk-table-expand';
    } else if (size === 'shrink') {
      return 'uk-table-shrink';
    } else if (size === 'auto') {
      return 'auto';
    } else {
      return 'auto';
    }
  }
</script>

<style src="./Table.scss">

</style>

{#if data}
  <section class="Table">

    <div class="Table-outer">
      <div
        class="Table-inner"
        style={height ? `height: calc(${height} - ${headerHeight}px)` : ''}>
        <table
          class={`uk-table uk-table-middle Table-container ${height ? 'uk-table-scrollable' : ''}`}>
          <thead>
            <tr class="Table-headerRow">
              {#each headers as header}
                <th
                  scope="col"
                  class={`Table-headerRow-headerCell ${getHeaderSize(header.size)}
                  ${header.header === 'actions' || header.header === 'userActions' ? 'alignRight' : ''}`}>
                  {#if header.header == 'view'}
                    {''}
                  {:else if header.header == 'actions' || header.header == 'userActions'}
                    {#if selected.length > 0}
                      <div
                        on:click={() => {
                          handleDeleteSelected();
                        }}
                        class="Table-deleteAll">
                        <Icon color="#e86172" type="delete" hover />
                      </div>
                    {/if}
                  {:else}{header.text}{/if}
                </th>
              {/each}
            </tr>
          </thead>
          <tbody class="Table-body">
            {#if data && data.length > 0}
              {#each data as item, index}
                <tr class="Table-row">
                  {#each headers as header}
                    <td class={`Table-cell ${getHeaderSize(header.size)}`}>
                      {#if header.header == 'status'}
                        <OrderStatusLabel status={item.status} />
                      {:else if header.header == 'order'}
                        <span class="Table-row-orderNumber">
                          {item.orderId}
                        </span>
                        <br />
                        <span class="Table-row-orderDate">
                          {moment(item.createdAt).format('MMM D, YYYY')}
                        </span>
                      {:else if header.header == 'dm'}
                        <div class="uk-width-medium">
                          {#if role === 'ADMIN'}
                            <Input
                              fill
                              value={item[header.header]}
                              icon="caretdown"
                              disabled
                              noborder />

                            <Dropdown
                              simpleSelect={true}
                              data={managerOpts}
                              handleSelect={v => {
                                handleSelectManager(item.id, v);
                              }} />
                          {:else}{item[header.header]}{/if}
                        </div>
                      {:else if header.header == 'trucks'}
                        {#if item.trucks}
                          <div class="uk-flex">
                            {#each item.trucks as truck}
                              <div class="Table-label uk-flex">
                                {truck}
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill={'#15224B'}
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="clickable"
                                  on:click={() => {
                                    removeTruckFromTeam(item.id, truck);
                                  }}>
                                  <path
                                    d="M12 4.25C7.71875 4.25 4.25 7.71875 4.25
                                    12C4.25 16.2812 7.71875 19.75 12
                                    19.75C16.2812 19.75 19.75 16.2812 19.75
                                    12C19.75 7.71875 16.2812 4.25 12 4.25ZM12
                                    18.75C8.28125 18.75 5.25 15.75 5.25 12C5.25
                                    8.3125 8.25 5.25 12 5.25C15.6875 5.25 18.75
                                    8.28125 18.75 12C18.75 15.7188 15.7188 18.75
                                    12 18.75ZM14.9375 9.84375C15.0938 9.6875
                                    15.0938 9.46875 14.9375 9.3125L14.6875
                                    9.0625C14.5312 8.90625 14.3125 8.90625
                                    14.1562 9.0625L12 11.2188L9.8125
                                    9.0625C9.6875 8.90625 9.4375 8.90625 9.28125
                                    9.0625L9.03125 9.3125C8.875 9.46875 8.875
                                    9.6875 9.03125 9.84375L11.1875 12L9.03125
                                    14.1875C8.875 14.3125 8.875 14.5625 9.03125
                                    14.7188L9.28125 14.9688C9.4375 15.125 9.6875
                                    15.125 9.8125 14.9688L12 12.8125L14.1562
                                    14.9688C14.3125 15.125 14.5312 15.125
                                    14.6875 14.9688L14.9375 14.7188C15.0938
                                    14.5625 15.0938 14.3125 14.9375
                                    14.1875L12.7812 12L14.9375 9.84375Z" />
                                </svg>
                              </div>
                              &nbsp;
                            {/each}

                            <div class="Table-label uk-flex clickable">
                              Add
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill={'#15224B'}
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M17.75 11.25H12.75V6.25C12.75 6.125 12.625
                                  6 12.5 6H11.5C11.3438 6 11.25 6.125 11.25
                                  6.25V11.25H6.25C6.09375 11.25 6 11.375 6
                                  11.5V12.5C6 12.6562 6.09375 12.75 6.25
                                  12.75H11.25V17.75C11.25 17.9062 11.3438 18
                                  11.5 18H12.5C12.625 18 12.75 17.9062 12.75
                                  17.75V12.75H17.75C17.875 12.75 18 12.6562 18
                                  12.5V11.5C18 11.375 17.875 11.25 17.75 11.25Z" />
                              </svg>

                            </div>
                            <Dropdown
                              simpleSelect={true}
                              data={truckOpts}
                              handleSelect={v => {
                                handleSelectTruck(item.id, v);
                              }} />

                          </div>
                        {/if}
                      {:else if header.header == 'view'}
                        <div class="alignRight">
                          <span>
                            <a href={`/${item.type}/${item.id}`}>View</a>
                          </span>
                        </div>
                      {:else if header.header == 'actions'}
                        <div class="Table-row-actions alignRight">
                          <div
                            on:click={() => {
                              item.id && item.orderId ? handleDelete(item.id, item.orderId) : item.id ? handleDelete(item.id) : handleDelete(index);
                            }}>
                            <Icon type="delete" hover />
                          </div>
                          <div style="margin-left: 10px;" />
                          <div class="Table-checkbox">
                            <Checkbox
                              on:click={() => {
                                item.id && item.orderId ? handleCheck(item.id, item.orderId) : item.id ? handleCheck(item.id) : handleCheck(index);
                              }}
                              secondary />
                          </div>
                        </div>
                      {:else if header.header == 'userActions'}
                        <div class="Table-row-actions alignRight">
                          <a href={`/${item.type}/${item.id}`}>
                            <Icon type="edit" hover />
                          </a>

                          <div style="margin-left: 10px;" />
                          <div
                            on:click={() => {
                              item.id ? handleDelete(item.id) : handleDelete(index);
                            }}>
                            <Icon type="delete" hover />
                          </div>
                          <div style="margin-left: 10px;" />
                          <div class="Table-checkbox">
                            <Checkbox
                              on:click={() => {
                                item.id ? handleCheck(item.id) : handleCheck(index);
                              }}
                              secondary />
                          </div>
                        </div>
                      {:else if header.header == 'filename'}
                        <div class="Table-row-filename">
                          <div>
                            <Icon type="file" color="#15224B" />
                          </div>

                          <div>{item.fileName}</div>
                        </div>
                      {:else if header.header == 'createdAt' || header.header == 'updatedAt'}
                        {formatDate(item[header.header], true)}
                      {:else}{item[header.header]}{/if}
                    </td>
                  {/each}
                </tr>
              {/each}
            {:else}
              <tr class="Table-row">
                <td colspan="100%" class="Table-empty">No results</td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>
    </div>

  </section>
{/if}
