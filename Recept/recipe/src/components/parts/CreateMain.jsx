import React from "react";

function CreateMain(params) {
    return(
        <main>
            <h1>Skapa Recept</h1>
            <form action="/user">
                <label htmlFor="name">Namn</label>
                <input type="text" id="name" name="name"/>
                
                <label htmlFor="description">Beskrivning</label>
                <textarea id="description" name="description"rows="10"></textarea>

                <span>
                    <label htmlFor="ingredients">Ingredienser</label>
                    <select id="ingredients" name="ingredients">                        
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                    </select>
                    <label>Mängd</label>
                </span>

                <section>
                    <input type="text" id="ingredient1" name="ingredient1"/>
                    <input type="text" id="amount1" name="amount1"/>
                    <input type="text" id="ingredient1" name="ingredient1"/>
                    <input type="text" id="amount1" name="amount1"/>
                    <input type="text" id="ingredient1" name="ingredient1"/>
                    <input type="text" id="amount1" name="amount1"/>
                    <input type="text" id="ingredient1" name="ingredient1"/>
                    <input type="text" id="amount1" name="amount1"/>
                    <input type="text" id="ingredient1" name="ingredient1"/>
                    <input type="text" id="amount1" name="amount1"/>
                    <input type="text" id="ingredient1" name="ingredient1"/>
                    <input type="text" id="amount1" name="amount1"/>
                    <input type="text" id="ingredient1" name="ingredient1"/>
                    <input type="text" id="amount1" name="amount1"/>
                    <input type="text" id="ingredient1" name="ingredient1"/>
                    <input type="text" id="amount1" name="amount1"/>
                </section>

                <span>
                    <label htmlFor="steps">Steg</label>
                    <select id="steps" name="steps">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                    </select>
                </span>

                <label htmlFor="step1">1.</label>
                <textarea id="step1" name="step1"rows="5"></textarea>

                <label htmlFor="image">Bild</label>
                <input type="file" id="image" />
                <input type="submit" value="Skapa receptet"/>
            </form>
        </main>
    );
}

export default CreateMain;