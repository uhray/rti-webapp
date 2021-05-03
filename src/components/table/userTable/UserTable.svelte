<script>
  import { onMount, afterUpdate, createEventDispatcher } from 'svelte';
  import * as _ from 'lodash';
  import { deleteUser } from '../../../tools/crudApi';
  import DeleteModal from '../../modals/delete/Delete.svelte';
  import Label from '../../label/Label.svelte';
  import Icon from '../../icon/Icon.svelte';
  import { userStore } from '../../../store';
  export let data = undefined;
  export let expand = false;
  export let type = 'user';
  let selectedUsers = [];
  let adminHeaders = ['Full Name', 'Email', 'Last Login Date'];
  let userHeaders = [
    'Full Name',
    'User ID',
    'Driver Manager',
    'Vehicle',
    'Status',
  ];
  let modalOpen = false;
  let modalType = 'user';
  let numDelete = 'multi';

  const dispatch = createEventDispatcher();

  const deleteUsers = arr => {
    _.each(arr, user => deleteUser(user));
    modalOpen = false;
    numDelete = 'multi';
    selectedUsers = [];
  };

  const closeModal = () => {
    selectedUsers = [];
    modalOpen = false;
  };

  const handleDelete = (id, type, num) => {
    selectedUsers.push(id);
    modalType = type;
    console.log(selectedUsers);
    modalOpen = true;
  };

  onMount(() => {
    selectedUsers = [];
  });
  afterUpdate(() => {
    console.log($userStore);
    console.log(selectedUsers);
  });
</script>

<section class="UserTable">
  {#if selectedUsers.length !== 0 && numDelete !== 'single'}
    <p class="UserTable-deleteMulti" on:click={() => (modalOpen = true)}>
      Delete Selections <Icon type="delete-small" color="#2b8af7" />
    </p>
  {/if}
  {#if modalOpen}
    <DeleteModal
      on:closeModal={closeModal}
      type={modalType}
      on:confirm={() => deleteUsers(selectedUsers)}
    />
  {/if}
  <div class="UserTable-outer">
    <div class="UserTable-inner">
      <table>
        <thead>
          <tr
            class={type === 'admin'
              ? 'UserTable-headerRow admin'
              : 'UserTable-headerRow user'}
          >
            {#if type === 'admin'}
              {#each adminHeaders as header}
                <th scope="col" class="UserTable-headerCell">
                  {header}
                </th>
              {/each}
            {:else}
              {#each userHeaders as header}
                <th scope="col" class="UserTable-headerCell">
                  {header}
                </th>
              {/each}
            {/if}
          </tr>
        </thead>
        <tbody class="UserTable-body">
          {#if type === 'admin'}
            {#each data as item}
              <tr class="UserTable-row admin">
                <td>
                  {`${item.contactInfo.firstName} ${item.contactInfo.lastName}`}
                </td>
                <td>{item.email}</td>
                <td>{item.lastLogin ? item.lastLogin : ''}</td>
                <td class="UserTable-rowIcons">
                  {#if item._id !== $userStore.user._id}
                    <div>
                      <Icon
                        type="delete"
                        hover
                        on:delete={() =>
                          handleDelete(item._id, 'admin', 'single')}
                      />
                    </div>
                    <div>
                      <input
                        class="uk-checkbox"
                        type="checkbox"
                        secondary
                        bind:group={selectedUsers}
                      />
                    </div>
                  {:else}
                    {''}
                  {/if}
                </td>
              </tr>
            {/each}
          {:else}
            {#each data as item}
              <tr class="UserTable-row user">
                <td>
                  {`${item.contactInfo.firstName} ${item.contactInfo.lastName}`}
                </td>
                <td>{item.username ? item.username : ''}</td>
                <td>{item.teamLeader ? item.teamLeader : ''}</td>
                <td>{item.truckNumber ? item.truckNumber : ''}</td>
                <td>
                  {#if item.status === undefined}
                    {''}
                  {:else if item.status === 'active'}
                    <Label status="default" text="Active" />
                  {:else}
                    <Label status="disabled" text="Inactive" />
                  {/if}
                </td>
                <td class="UserTable-rowIcons">
                  {#if item._id !== $userStore.user._id}
                    <div>
                      <Icon
                        type="edit"
                        hover
                        on:edit={() =>
                          (window.location = `/users/profile/${item._id}`)}
                      />
                    </div>
                    <div>
                      <Icon
                        type="delete"
                        hover
                        on:delete={() =>
                          handleDelete(item._id, 'user', 'single')}
                      />
                    </div>
                    <div>
                      <input
                        class="uk-checkbox"
                        type="checkbox"
                        value={item._id}
                        secondary
                        bind:group={selectedUsers}
                      />
                    </div>
                  {:else}
                    {''}
                  {/if}
                </td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</section>

<style src="./UserTable.scss">
</style>
