<script>
import { createEventDispatcher } from 'svelte';
import Icon from '../../icon/Icon.svelte';
export let type;

const dispatch = createEventDispatcher();

</script>

<style src='./Delete.scss'/>

<div class='DeleteModal' on:click={() => dispatch('closeModal')}>
    <div class='DeleteModal-inner'>
        <div class='DeleteModal-content'>
        <div class='DeleteModal-closeIcon' on:click={() => dispatch('closeModal')}><Icon type='close'/></div>
        <h3 class='DeleteModal-title'>Delete Selected {#if type === 'admin'}Admins{:else}Users{/if}?</h3>
        {#if type === 'admin'}
        <p>This will block their access to the workspace and permanently delete their information from any other admins' workspaces.</p>
        <p>Are you sure you want to <span style="color:red">permanently delete</span> selected admins?</p>
        {/if}
        <div class='DeleteModal-buttonContainer'>
            <button class='DeleteModal-cancel' on:click={() => dispatch('closeModal')}>Cancel</button>
            <button class='DeleteModal-confirm' on:click={() => dispatch('confirm')}>Yes, Delete<button>
        </div>
    </div>
    </div>
    
</div>