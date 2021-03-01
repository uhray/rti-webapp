<script>
  import Checkbox from '../checkbox/Checkbox.svelte';
  import Status from '../status/Status.svelte';
  export let data;
</script>

<style src="./Table.scss">

</style>

<!-- HTML -->
<section class="Table">
  <div class="Table-card uk-padding-remove Table-card">
    <div class="uk-card-body Table-cardBody">
      <table
        class="uk-table uk-table-divider uk-table-middle Table-tableContainer">
        <thead>
          <tr class="Table-headerRow">
            {#each data.headers as header}
              <th class="Table-headerRow-headerCell">{header}</th>
            {/each}
          </tr>
        </thead>
        <tbody class="Table-body">
          {#each data.data as entry}
            <tr class="Table-row">
              {#each data.headers as header}
                <td class="Table-defaultBodyText">Title</td>
              {/each}
            </tr>
          {/each}

          <tr class="Table-row">
            <td>
              <Checkbox />
            </td>
            <td class="Table-defaultBodyText">Title</td>
            <td class="uk-text-truncate Table-defaultBodyText">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatibus quas placeat, quos repellat necessitatibus labore.
              Nemo voluptas culpa, architecto vero laudantium perferendis soluta
              fugit officiis ex fugiat dolor placeat in?
            </td>
            <td>
              <Status type="success" text="Active" />
            </td>
            <td class="Table-defaultBodyText">02/22/2021</td>
            <td class="Table-defaultBodyText">02/22/2021</td>
          </tr>
          <tr class="Table-row">
            <td>
              <Checkbox />
            </td>
            <td class="Table-defaultBodyText">Title</td>
            <td class="uk-text-truncate Table-defaultBodyText">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatibus quas placeat, quos repellat necessitatibus labore.
              Nemo voluptas culpa, architecto vero laudantium perferendis soluta
              fugit officiis ex fugiat dolor placeat in?
            </td>
            <td>
              <Status type="caution" text="Pending" />
            </td>
            <td class="Table-defaultBodyText">02/22/2021</td>
          </tr>
          <tr class="Table-row">
            <td>
              <Checkbox />
            </td>
            <td class="Table-defaultBodyText">Title</td>
            <td class="uk-text-truncate Table-defaultBodyText">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatibus quas placeat, quos repellat necessitatibus labore.
              Nemo voluptas culpa, architecto vero laudantium perferendis soluta
              fugit officiis ex fugiat dolor placeat in?
            </td>
            <td>
              <Status type="warning" text="Expired" />
            </td>
            <td class="Table-defaultBodyText">02/22/2021</td>
          </tr>
          <tr class="Table-row">
            <td>
              <Checkbox />
            </td>
            <td class="Table-defaultBodyText">Title</td>
            <td class="uk-text-truncate Table-defaultBodyText">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatibus quas placeat, quos repellat necessitatibus labore.
              Nemo voluptas culpa, architecto vero laudantium perferendis soluta
              fugit officiis ex fugiat dolor placeat in?
            </td>
            <td>
              <Status type="default" text="Draft" />
            </td>
            <td class="Table-defaultBodyText">02/22/2021</td>
          </tr>
          <tr class="Table-row">
            <td>
              <Checkbox />
            </td>
            <td class="Table-defaultBodyText">Title</td>
            <td class="uk-text-truncate Table-defaultBodyText">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatibus quas placeat, quos repellat necessitatibus labore.
              Nemo voluptas culpa, architecto vero laudantium perferendis soluta
              fugit officiis ex fugiat dolor placeat in?
            </td>
            <td>
              <Status type="success" text="Active" />
            </td>
            <td class="Table-defaultBodyText">02/22/2021</td>
          </tr>
        </tbody>
      </table>
      <!-- Put subsection for pagination here -->
      <div class="Table-subSection">
        <div class="uk-align-left Table-subText">Showing 1-20 of 60 items</div>
        <div class="uk-align-right Table-subText">1 / 3</div>
      </div>
    </div>
  </div>
</section>

<!-- ==== -->
