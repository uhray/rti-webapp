<script>
  import Checkbox from '../checkbox/Checkbox.svelte';
  export let type;
</script>

<!-- HTML -->
<section class="Table">
  {#if type === 'default'}
    <div
      class="uk-card uk-card-default Table-card uk-padding-remove Table-card"
    >
      <div class="uk-card-body Table-cardBody">
        <table
          class="uk-table uk-table-small  uk-table-divider uk-table-middle Table-tableContainer"
        >
          <thead class="Table-defaultHead">
            <tr class="Table-defaultRow">
              <th class="uk-table-shrink" />
              <th class="Table-defaultHeaderText">Title</th>
              <th class="uk-table-expand Table-defaultHeaderText"
                >Description</th
              >
              <th class="uk-width-1-6 Table-defaultHeaderText">Status</th>
              <th class="uk-width-1-6 Table-defaultHeaderText">Create Date</th>
            </tr>
          </thead>
          <tbody class="Table-defaultBody">
            <tr class="Table-defaultRow">
              <td><Checkbox /></td>
              <td class="Table-defaultBodyText">Title</td>
              <td class="uk-text-truncate Table-defaultBodyText"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatibus quas placeat, quos repellat necessitatibus labore.
                Nemo voluptas culpa, architecto vero laudantium perferendis
                soluta fugit officiis ex fugiat dolor placeat in?</td
              >
              <td><Status type="success" text="Active" /></td>
              <td class="Table-defaultBodyText">02/22/2021</td>
            </tr>
            <tr class="Table-defaultRow">
              <td><Checkbox /></td>
              <td class="Table-defaultBodyText">Title</td>
              <td class="uk-text-truncate Table-defaultBodyText"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatibus quas placeat, quos repellat necessitatibus labore.
                Nemo voluptas culpa, architecto vero laudantium perferendis
                soluta fugit officiis ex fugiat dolor placeat in?</td
              >
              <td><Status type="caution" text="Pending" /></td>
              <td class="Table-defaultBodyText">02/22/2021</td>
            </tr>
            <tr class="Table-defaultRow">
              <td><Checkbox /></td>
              <td class="Table-defaultBodyText">Title</td>
              <td class="uk-text-truncate Table-defaultBodyText"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatibus quas placeat, quos repellat necessitatibus labore.
                Nemo voluptas culpa, architecto vero laudantium perferendis
                soluta fugit officiis ex fugiat dolor placeat in?</td
              >
              <td><Status type="warning" text="Expired" /></td>
              <td class="Table-defaultBodyText">02/22/2021</td>
            </tr>
            <tr class="Table-defaultRow">
              <td><Checkbox /></td>
              <td class="Table-defaultBodyText">Title</td>
              <td class="uk-text-truncate Table-defaultBodyText"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatibus quas placeat, quos repellat necessitatibus labore.
                Nemo voluptas culpa, architecto vero laudantium perferendis
                soluta fugit officiis ex fugiat dolor placeat in?</td
              >
              <td><Status type="default" text="Draft" /></td>
              <td class="Table-defaultBodyText">02/22/2021</td>
            </tr>
            <tr class="Table-defaultRow">
              <td><Checkbox /></td>
              <td class="Table-defaultBodyText">Title</td>
              <td class="uk-text-truncate Table-defaultBodyText"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatibus quas placeat, quos repellat necessitatibus labore.
                Nemo voluptas culpa, architecto vero laudantium perferendis
                soluta fugit officiis ex fugiat dolor placeat in?</td
              >
              <td><Status type="success" text="Active" /></td>
              <td class="Table-defaultBodyText">02/22/2021</td>
            </tr>
          </tbody>
        </table>
        <!-- Put subsection for pagination here -->
        <div class="Table-subSection">
          <div class="uk-align-left Table-subText">
            Showing 1-20 of 60 items
          </div>
          <div class="uk-align-right Table-subText">1 / 3</div>
        </div>
      </div>
    </div>
  {/if}
</section>

<!-- ==== -->
<style src="./Table.scss">
</style>
