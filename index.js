<div id="draw">
	<div class="welcome-bg" v-if="popups.showWelcome">
		<div class="welcome">
			<h1 class="fade-up">Vue JS draw</h1>
			<h2 class="fade-up">
				By Lewi Hussey
			</h2>
			<a href="//twitter.com/lewitje" target="blank" title="Lewi Hussey on Twitter" class="fade-up">@lewitje</a>
			<span class="btn fade-up"
						title="Close"
						v-on:click="popups.showWelcome = false">
				Lets go
			</span>
		</div>
	</div>
	<div class="app-wrapper">
		<canvas id="canvas">
		</canvas>
		<div class="cursor" id="cursor"></div>
		<div class="controls">
			<div class="btn-row">
				<div class="history" title="history">
					{{ history.length }}
				</div>
			</div>
			<div class="btn-row">
				<button type="button"
								v-on:click="removeHistoryItem"
								v-bind:class="{ disabled: !history.length }" title="Undo">
					<i class="ion ion-reply"></i>
				</button>
				<button type="button"
								v-on:click="removeAllHistory"
								v-bind:class="{ disabled: !history.length }" title="Clear all">
					<i class="ion ion-trash-a"></i>
				</button>
			</div>
			
			<div class="btn-row">
				<button title="Brush options"
								v-on:click="popups.showOptions = !popups.showOptions">
					<i class="ion ion-android-create"></i>
				</button>
				
				<div class="popup" v-if="popups.showOptions">
					<div class="popup-title">
						Options
					</div>
					<button title="Restrict movement vertical"
									v-on:click="options.restrictY = !options.restrictY; options.restrictX = false"
									v-bind:class="{ active: options.restrictY }"
									title="Restrict vertical">
						<i class="ion ion-arrow-right-c"></i>
						Restrict vertical
					</button>
					<button title="Restrict movement horizontal"
									v-on:click="options.restrictX = !options.restrictX; options.restrictY = false"
									v-bind:class="{ active: options.restrictX }"
									title="Restrict horizontal">
						<i class="ion ion-arrow-up-c"></i>
						Restrict horizontal
					</button>
					<button type="button"
								v-on:click="simplify"
								v-bind:class="{ disabled: !history.length }" title="Simplify paths">
						<i class="ion ion-wand"></i>
						Simplify paths
					</button>
					<button type="button"
									v-on:click="jumble"
									v-bind:class="{ disabled: !history.length }" title="Go nutz">
						<i class="ion ion-shuffle"></i>
						Go nutz
					</button>
				</div>
				
			</div>

			<div class="btn-row">
				<button title="Pick a brush size"
								v-on:click="popups.showSize = !popups.showSize"
								v-bind:class="{ active: popups.showSize }">
					<i class="ion ion-android-radio-button-on"></i>
					<span class="size-icon">
						{{ size }}
					</span>
				</button>
				
				<div class="popup" v-if="popups.showSize">
					<div class="popup-title">
						Brush size
					</div>
					<label v-for="sizeItem in sizes" class="size-item">
						<input type="radio" name="size" v-model="size" v-bind:value="sizeItem">
						<span class="size"
									v-bind:style="{width: sizeItem + 'px', height: sizeItem + 'px'}"
									v-on:click="popups.showSize = !popups.showSize"></span>
					</label>
				</div>
			</div>
			
			<div class="btn-row">
				<button title="Pick a color"
								v-on:click="popups.showColor = !popups.showColor"
								v-bind:class="{ active: popups.showColor }">
					<i class="ion ion-android-color-palette"></i>
					<span class="color-icon"
								v-bind:style="{backgroundColor: color}">
					</span>
				</button>
				
				<div class="popup" v-if="popups.showColor">
					<div class="popup-title">
						Brush color
					</div>
					<label v-for="colorItem in colors" class="color-item">
						<input type="radio"
									 name="color"
									 v-model="color"
									 v-bind:value="colorItem">
						<span v-bind:class="'color color-' + colorItem"
									v-bind:style="{backgroundColor: colorItem}"
									v-on:click="popups.showColor = !popups.showColor"></span>
					</label>
				</div>
			</div>
			
			<div class="btn-row">
				<button title="Save"
								v-on:click="popups.showSave = !popups.showSave">
					<i class="ion ion-android-cloud-outline"></i>
				</button>
				
				<div class="popup" v-if="popups.showSave">
					<div class="popup-title">
						Save your design
					</div>
					<div class="form">
						<input type="text"
									 placeholder="Save name"
									 v-model="save.name">
						<div v-if="save.name.length < 3" class="text-faded">
							<i>
								Min 3 characters
							</i>
						</div>
						<span class="btn"
									v-on:click="saveItem">
							Save as
							<span class="text-faded"> 
								{{ save.name }}
							</span>
						</span>
					</div>
					
					<div class="saves" v-if="save.saveItems.length">
						<div class="popup-title">
							Load a save
						</div>

						<div class="save-item"
								 v-for="item in save.saveItems">
							<h3>{{ item.name }}</h3>
							<span class="btn"
										v-on:click="loadSave(item)">load</span>
						</div>
					</div>
				</div>
				
			</div>
			
			<div class="btn-row">
				<button v-on:click="popups.showWelcome = true" title="Made by Lewi">
					<i class="ion ion-heart"></i>
				</button>
			</div>
		</div>
	</div>
</div>
