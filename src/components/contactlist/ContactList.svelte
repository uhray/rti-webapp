<script>
  import Icon from '../icon/Icon.svelte';
  import Avatar from '../Avatar/Avatar.svelte';
  import { colors } from '../../theme/variables.js';
  import _ from 'lodash';

  export let trigger;
  export let slug;
  export let driversList = [];
  export let collapsed = [];
  export let toggleMessageOverlay = undefined;
  export let search;
  export let loading;

  const collapse = id => {
    if (_.includes(collapsed, id)) {
      _.pull(collapsed, id);
    } else {
      collapsed.push(id);
    }
    collapsed = collapsed;
  };
</script>

<style src="./ContactList.scss">

</style>

<div class="ContactList">

  {#if !loading}
    <a rel="prefetch" href="messages/all" on:click={trigger('all')}>
      <div class={`ContactList-allMessages ${slug === 'all' && 'active'}`}>
        <div class="uk-flex uk-flex-middle">
          <div class="ContactList-allMessages-icon">
            <Icon type="indicator" color={colors.darkblue} />
          </div>
          <div class="ContactList-allMessages-text">All Messages</div>
        </div>
      </div>
    </a>

    {#each driversList as group}
      <div class="ContactList-group">
        <div class="ContactList-group-header">
          <div class="uk-flex uk-flex-middle">
            <div class="ContactList-group-icon" on:click={collapse(group.id)}>
              <Icon
                type={_.includes(collapsed, group.id) === false ? 'caretdown' : 'caretup'}
                color={colors.darkblue} />
            </div>
            <div class="ContactList-group-text">{group.name}</div>
          </div>
          <div
            class="ContactList-group-icon"
            on:click={() => {
              toggleMessageOverlay(group);
            }}>
            <Icon type="message" />
          </div>
        </div>

        {#if _.includes(collapsed, group.id) === false}
          <div class="ContactList-subgroup">
            {#each group.subgroups as subgroup}
              <div class="ContactList-subgroup-container">
                <span class="ContactList-subgroup-text">{subgroup.name}</span>

                {#each subgroup.contacts as contact}
                  {#if contact.name
                    .toLowerCase()
                    .includes(search.toLowerCase())}
                    <a
                      rel="prefetch"
                      href={`messages/${contact.id}`}
                      on:click={trigger(contact.id)}>
                      <div
                        class={`ContactList-contact ${slug === contact.id && 'active'}`}>

                        <div class="ContactList-contact-picture">
                          <Avatar user={contact} size={24} />

                        </div>

                        <div class="ContactList-contact-name">
                          {contact.name}
                        </div>
                      </div>
                    </a>
                  {/if}
                {/each}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  {:else}
    <div class="ContactList-loading">
      <div uk-spinner class="Loader-color" />
    </div>
  {/if}
</div>
