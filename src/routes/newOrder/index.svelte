<script>
  import _ from 'lodash';

  let orderNumber = '123';
  let assignedTruckId = '321';
  let stops = [{
    stopType: '',
    appointmentTimeStart: '',
    appointmentTimeEnd: '',
    notes: '',
    reference: '',
    DICT: '',
    company: '',
    companyId: '',
    companyOrderId: '',
    companyPhoneNumber: '',
    trailerNumber: '',
    trailerWeight: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipcode: '',
    }
  }];
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
  .Order {
    padding: 2em;
    position: relative;
    label {
      display: block !important;
      div {
        margin-top: 1em;
      }
      input { 
        width: 100%;
      }
    }
    button {
      margin: 1em;
    }

    .Order-data {
      max-width: 300px;
    }
    .Order-addStop {
      position: absolute;
      top: 4em;
      right: 2em;
      padding: 1em;
      border-radius: 10px;
      background-color: #233e93;
      color: white;
    }

    button {
      padding: 1em;
      border-radius: 10px;
      background-color: #233e93;
      color: white;
    }

    .Order-stops {
      padding: 1em; 
      background: #eee; 
      display: flex; 
      justify-content: flex-start; 
      flex-wrap: wrap;
      margin-top: 1em;
    }
  }
</style>

<svelte:head>
  <title>Make a New Order</title>
</svelte:head>

<div class='Order'>
  <div class="Order-data">
    <label>
      <div>Order Number</div>
      <input
      placeholder="ex 10000"
      bind:value={orderNumber}
      />
    </label>
    <label>
      <div>Assigned Truck Id</div>
      <input
      placeholder="ex 00007"
      bind:value={assignedTruckId}
      />
    </label>
  </div>
  <button 
    class="Order-addStop"
    on:click={() => {
      const newStops = _.cloneDeep(stops);
      newStops.push(_.last(stops))
      stops = [];
      stops = newStops;
    }}
  >
    Add Stop +
  </button>
  <div class="Order-stops">
    {#each stops as stop, i}
      <div style={'padding: 1em; background: #fff; width: 40%; margin: 1em;'}>
        <div style="text-align: right">Stop {i+1}</div>
        <label>
          <div>event</div>
          <input
            placeholder="ex BBT"
            bind:value={stop.event}
          />
        </label>
        <label>
          <div>appointmentTimeStart</div>
          <input
            placeholder="ex 2021-10-07T10:00:00.000Z"
            bind:value={stop.appointmentTimeStart}
          />
        </label>
        <label>
          <div>appointmentTimeEnd</div>
          <input
            placeholder="ex 2021-10-07T11:00:00.000Z"
            bind:value={stop.appointmentTimeEnd}
          />
        </label>
        <label>
          <div>companyName</div>
          <input
            placeholder="ex ABC Co."
            bind:value={stop.company}
          />
        </label>
        <label>
          <div>companyId</div>
          <input
            placeholder="ex 123"
            bind:value={stop.companyId}
          />
        </label>
        <label>
          <div>companyOrderId</div>
          <input
            placeholder="ex 123"
            bind:value={stop.companyOrderId}
          />
        </label>
        <label>
          <div>companyPhoneNumber</div>
          <input
            placeholder="ex 9137778888"
            bind:value={stop.companyPhoneNumber}
          />
        </label>
        <label>
          <div>trailerNumber</div>
          <input
            placeholder="ex 1234"
            bind:value={stop.trailerNumber}
          />
        </label>
        <label>
          <div>trailerWeight</div>
          <input
            placeholder="Expected trailer weight in lbs ..."
            bind:value={stop.trailerWeight}
          />
        </label>
        <label>
          <div>notes</div>
          <input
            placeholder="Notes here ..."
            bind:value={stop.notes}
          />
        </label>
        <label>
          <div>reference</div>
          <input
            placeholder="Reference"
            bind:value={stop.notes}
          />
        </label>
        <label>
          <div>DICT</div>
          <input
            placeholder="DICT"
            bind:value={stop.notes}
          />
        </label>
      </div>
    {/each}
  </div>
  <br/>
  <button style="width: 100%;" on:click={() => submit()}>Submit</button>
  <br/>
</div>


<!-- ===================================================== -->
