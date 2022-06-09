<script lang="ts">
	import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
	import { createEventDispatcher } from "svelte";
	export let date: Date = new Date();
	const dispatch = createEventDispatcher();
	let className: string = "";
	export { className as class };

	const monthNames = [
		"一月",
		"二月",
		"三月",
		"四月",
		"五月",
		"六月",
		"七月",
		"八月",
		"九月",
		"十月",
		"十一月",
		"十二月",
	];

	let monthIndex = date.getMonth();
	$: month = monthNames[monthIndex];

	let year = date.getFullYear();

	/**
	 * First day of this month
	 */
	$: firstDayIndex = new Date(year, monthIndex, 1).getDay();

	/**
	 * Days of this month
	 */
	$: numberOfDays = new Date(year, monthIndex + 1, 0).getDate();

	/**
	 * Calendar cells count
	 */
	const calendarCellsQty = 42;
	let isEditYear = false;

	let yearList = [];
	let startYear = Math.floor(date.getFullYear() / 20) * 20;
	function updateYearList() {
		let temp: number[] = [];
		for (let i = 0; i < 20; i += 1) {
			temp.push(startYear + i);
		}
		yearList = temp;
	}
	updateYearList();

	const goToNext = () => {
		if (isEditYear) {
			startYear += 20;
			updateYearList();
		} else {
			if (monthIndex >= 11) {
				year += 1;
				monthIndex = 0;
			}
			monthIndex += 1;
		}
	};

	const goToPrev = () => {
		if (isEditYear) {
			startYear -= 20;
			updateYearList();
		} else {
			if (monthIndex <= 0) {
				year -= 1;
				monthIndex = 11;
			}
			monthIndex -= 1;
		}
	};
</script>

<div class="calendar {className}">
	<div class="tool-bar">
		<span class="arrow-button" on:click={goToPrev}>
			<svg width="24px" height="24px">
				<path d={mdiChevronLeft} />
			</svg>
		</span>

		<span
			class="year-label"
			on:click={() => {
				isEditYear = true;
			}}
		>
			<span class="label year">{year}</span>
			<span class="label month">{month}</span>
		</span>

		<span class="arrow-button" on:click={goToNext}>
			<svg width="24px" height="24px">
				<path d={mdiChevronRight} />
			</svg>
		</span>
	</div>
	{#if isEditYear}
		<div class="grid">
			{#each Array(5) as _, i}
				<div class="row">
					{#each Array(4) as _, j}
						<span
							class="cell"
							class:active={date.getFullYear() ===
								yearList[i * 4 + j]}
							on:click={() => {
								date.setFullYear(yearList[i * 4 + j]);
								date = date;
								isEditYear = false;
							}}
						>
							{yearList[i * 4 + j] || ""}
						</span>
					{/each}
				</div>
			{/each}
		</div>
	{:else}
		<div class="days grid">
			<div class="weekdays row">
				<span class="cell">日</span>
				<span class="cell">一</span>
				<span class="cell">二</span>
				<span class="cell">三</span>
				<span class="cell">四</span>
				<span class="cell">五</span>
				<span class="cell">六</span>
			</div>
			{#each Array(calendarCellsQty / 7) as _, i}
				<div class="row">
					{#each Array(7) as _, j}
						{#if i * 7 + j < firstDayIndex || i * 7 + j >= numberOfDays + firstDayIndex}
							<span class="cell"> &nbsp; </span>
						{:else}
							<span
								class="cell valid {i * 7 +
									j -
									firstDayIndex +
									1 ===
									date.getDate() &&
								monthIndex === date.getMonth() &&
								year === date.getFullYear()
									? 'active'
									: ''}"
								on:click={() => {
									date.setMonth(monthIndex);
									date.setDate(i * 7 + j - firstDayIndex + 1);
									dispatch("SelectedDate", date);
									date = date;
								}}
							>
								{i * 7 + j - firstDayIndex + 1}
							</span>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="less">
	.calendar {
		.tool-bar {
			display: flex;
			flex-flow: row;
			justify-content: center;
			align-items: center;
			width: auto;
			text-align: center;
			color: #333;
			font-weight: 900;
			.arrow-button {
				display: flex;
				flex-flow: row;
				justify-content: center;
				align-items: center;
				flex: 1;
			}
			.year-label {
				display: flex;
				flex-flow: row;
				justify-content: center;
				align-items: center;
				flex: 5;
				.label {
					font-size: 18px;
					&.year {
						margin-right: 10px;
					}
				}
			}
		}
		.grid {
			display: flex;
			flex-flow: column;
			justify-content: center;
			align-items: center;
			.row {
				width: 100%;
				display: flex;
				flex-flow: row;
				justify-content: center;
				align-items: center;
				.cell {
					background: #eee;
					display: flex;
					flex-flow: row;
					justify-content: center;
					align-items: center;
					flex: 1;
					height: 57px;
					color: #000000;
					&.active {
						background: var(--secondary-background, #1b2727);
						color: white;
					}
					&.days {
						.weekdays {
							background-color: #c7c7c7;
							font-weight: 500;
							color: #fff;
						}
					}
				}
			}
		}
	}
	:global(.theme--dark) {
		.calendar {
			.tool-bar {
				color: #ffffff;
			}
		}
	}
</style>
