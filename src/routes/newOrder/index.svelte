<script>
  import SearchBar from '../../components/searchbar/SearchBar.svelte';
  import Checkbox from '../../components/checkbox/Checkbox.svelte';
  import ProgressBar from '../../components/progressbar/ProgressBar.svelte';
  import Radios from '../../components/radios/Radios.svelte';
  import Button from '../../components/button/Button.svelte';
  import Divider from '../../components/divider/Divider.svelte';
  import Icon from '../../components/icon/Icon.svelte';
  import DropDown from '../../components/UK-DropDown/DropDown.svelte';
  import Input from '../../components/input/Input.svelte';
  import Error from '../../components/error/Error.svelte';
  import Label from '../../components/label/Label.svelte';
  import TabMenu from '../../components/tabmenu/TabMenu.svelte';
  import ToolTip from '../../components/tooltip/ToolTip.svelte';
  import RichText from '../../components/richtext/RichText.svelte';
  import Card from '../../components/card/Card.svelte';
  import { createOrder } from '../../tools/crudApi';

  let orderNumber = '';
  let assignedTruckId = '';
  let stops = [];

  let emptyStop = {
    stopType: '',
    appointmentTimeStart: '',
    appointmentTimeEnd: '',
    notes: '',
    companyName: '',
    companyPhoneNumber: '',
    companyOrderId: '',
    trailerNumber: '',
    trailerWeight: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipcode: '',
    }
  }

  let error = false;
  let errorMessage = 'test';
  const errorTest = () => {
    error = !error;
  };
  const onInput = e => {
    errorMessage = e.target.value;
  };

  const submit = () => {
    console.log('submitting', orderNumber);
    console.log('submitting', assignedTruckId);
    console.log('submitting', stops);

    createOrder({
      orderNumber,
      assignedTruckId,
      stops
    })
  }
 
</script>

<style lang="scss">
  .Components {
    padding: 2em;
  }
</style>

<svelte:head>
  <title>Make a New Order</title>
</svelte:head>
<!-- 
    "orderNumber": "2000",
    "assignedTruckId": "00003",
    "stops": [
       {
            "event": "BBT",
            "start": "12/21/2020 10:00:00",
            "end": "12/21/2020 11:00:00",
            "company": "Kansas City Convention Center",
            "address": {
                "addressLine1": "301 W 13th St",
                "addressLine2": "Suite 100",
                "city": "Kansas City",
                "state": "MO",
                "zipcode": "64105"
            },
            "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tristique commodo eget semper id. Ultrices nunc posuere pellentesque ut etiam egestas sapien elit sed. Pellentesque ornare donec urna, integer. Facilisi ut pulvinar elit, tempus, aliquam tincidunt velit nunc.",
            "trialerNumber": "",
            "phone": "9137496423"
        }, 
      ]-->

<div style={'padding: 3em'}>
  <Input
    fill
    placeholder="ex 10000"
    bind:value={orderNumber}
    on:input={e => (orderNumber = e.target.value)}
    label="Order Number"
  />
  <Input
    fill
    placeholder="ex 00007"
    bind:value={assignedTruckId}
    label="Assigned Truck Id"
    on:input={e => (assignedTruckId = e.target.value)}
  />
    <button 
    style={'text-align: right'}
      on:click={() => {
        console.log('adding stop', stops);
        stops.push(emptyStop);
        stops = stops
      }}
    >
      Add Stop +
    </button>
  <div style={'padding: 1em; background: #eee; display: flex; justify-content: flex-start; flex-wrap: wrap;'}>
    {#each stops as stop, i}
      <div style={'padding: 1em; background: #fff; width: 40%; margin: 1em;'}>
        <div style="text-align: right">Stop {i+1}</div>
        <Input
          fill
          placeholder="ex ABC Co."
          bind:value={stop.companyName}
          on:input={e => {
            stop.companyName = e.target.value;
            stops = stops;
          }}
          label="Company Name"
        />
        <Input
          fill
          placeholder="ex 123"
          bind:value={stop.companyOrderId}
          label="Company Order Id"
          on:input={e => {
            stop.companyOrderId = e.target.value;
            stops = stops;
          }}
        />
        <Input
          fill
          placeholder="ex 9137778888"
          bind:value={stop.companyPhoneNumber}
          label="Company Phone"
          on:input={e => {
            stop.companyPhoneNumber = e.target.value;
            stops = stops;
          }}
        />
        <Input
          fill
          placeholder="Notes here ..."
          value={stop.notes}
          label="Notes"
          on:input={e => {
            stop.notes = e.target.value;
            stops = stops;
          }}
        />
        <Input
          fill
          placeholder="ex 1234"
          value={stop.trailerNumber}
          label="Trailer Number"
          on:input={e => {
            stop.trailerNumber = e.target.value;
            stops = stops;
          }}
        />
        <Input
          fill
          placeholder="Expected trailer weight in lbs ..."
          value={stop.trailerWeight}
          label="Trailer Weight"
          on:input={e => {
            stop.trailerWeight = e.target.value;
            stops = stops;
          }}
        />
        <Input
          fill
          placeholder="ex BBT"
          bind:value={stop.stopType}
          label="Event Type"
          on:input={e => {
            stop.stopType = e.target.value;
            stops = stops;
          }}
        />
        <Input
          fill
          placeholder="ex 2021-10-07T10:00:00.000Z"
          bind:value={stop.appointmentTimeStart}
          label="Appointment Time Start"
          on:input={e => {
            stop.appointmentTimeStart = e.target.value;
            stops = stops;
          }}
        />
        <Input
          fill
          placeholder="ex 2021-10-07T11:00:00.000Z"
          bind:value={stop.appointmentTimeEnd}
          label="Appointment Time End"
          on:input={e => {
            stop.appointmentTimeEnd = e.target.value;
            stops = stops;
          }}
        />
      </div>
    {/each}
  </div>
  <br/>
  <button style="width: 100%;" on:click={() => submit()}>Submit</button>
  <br/>
</div>


<!-- ===================================================== -->
