<script>
  export let slug;
  export let driversList = [];
  import Icon from '../icon/Icon.svelte';
  import { colors } from '../../theme/variables.js';
  import _ from 'lodash';

  export let collapsed = [];

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

<div class="ContactList ">
  <a rel="prefetch" href="messages">
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
        <div class="ContactList-group-icon">
          <Icon type="message" />
        </div>
      </div>

      {#if _.includes(collapsed, group.id) === false}
        <div class="ContactList-subgroup">
          {#each group.subgroups as subgroup}
            <div class="ContactList-subgroup-container">
              <span class="ContactList-subgroup-text">{subgroup.name}</span>

              {#each subgroup.contacts as contact}
                <a rel="prefetch" href={`messages/${contact.id}`}>
                  <div
                    class={`ContactList-contact ${slug === contact.id && 'active'}`}>
                    <div class="ContactList-contact-picture">
                      <img src={contact.picture} alt={contact.name} />
                    </div>
                    <div class="ContactList-contact-name">{contact.name}</div>
                  </div>
                </a>
              {/each}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/each}

</div>
