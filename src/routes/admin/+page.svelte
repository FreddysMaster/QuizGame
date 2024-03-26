<script>
    import "$lib/app.css";
    export let data;
    let { questions } = data;
    let deleteQuestions = [];
    let editMode = questions.map(() => false);
</script>

<main>
    <table class="table table-zebra m-8 w-[calc(100vw-4rem)] bg-white divide-x">
        <thead>
            <tr>
                <th>
                    <label>
                        <input
                            type="checkbox"
                            class="checkbox"
                            bind:group={deleteQuestions}
                            value={questions}
                        />
                    </label>
                </th>
                <th>ID</th>
                <th>Question</th>
                <th>Answers</th>
                <th>Correct Answer</th>
                <th>Category ID</th>
                <th>Edit</th>
            </tr>
        </thead>
        {#each questions as question, index}
            <tbody class="w-[calc(100vw-4rem)]">
                <tr>
                    {#if editMode[index]}
                        <th>
                            <label class="m-0">
                                <input
                                    type="checkbox"
                                    class="checkbox"
                                    bind:group={deleteQuestions}
                                    value={question.question_id}
                                />
                            </label>
                        </th>
                        <td>
                            <div class="font-bold">
                                {question.question_id}
                            </div>
                        </td>
                        <td>
                            <input
                                type="text"
                                class="input input-bordered"
                                bind:value={question.question}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                class="input input-bordered"
                                bind:value={question.answer1}
                            />,
                            <input
                                type="text"
                                class="input input-bordered"
                                bind:value={question.answer2}
                            />,
                            <input
                                type="text"
                                class="input input-bordered"
                                bind:value={question.answer3}
                            />,
                            <input
                                type="text"
                                class="input input-bordered"
                                bind:value={question.answer4}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                class="input input-bordered"
                                bind:value={question.correctAnswer}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                class="input input-bordered"
                                bind:value={question.category_id}
                            />
                        </td>
                        <td>
                            <button
                                class="btn btn-link"
                                type="submit"
                                on:click={() =>
                                    (editMode[index] = !editMode[index])}
                                >Save</button
                            >
                        </td>
                    {:else}
                        <th>
                            <label class="m-0">
                                <input
                                    type="checkbox"
                                    class="checkbox"
                                    bind:group={deleteQuestions}
                                    value={question.question_id}
                                />
                            </label>
                        </th>
                        <td>
                            <div class="font-bold">
                                {question.question_id}
                            </div>
                        </td>
                        <td>
                            {question.question}
                        </td>
                        <td>
                            {question.answer1}, {question.answer2}, {question.answer3},
                            {question.answer4}
                        </td>
                        <td>
                            {question.correctAnswer}
                        </td>
                        <td>
                            {question.category_id}
                        </td>
                        <td>
                            <button
                                class="btn btn-link"
                                on:click={() =>
                                    (editMode[index] = !editMode[index])}
                                >Edit</button
                            >
                        </td>
                    {/if}
                </tr>
            </tbody>
        {/each}
        <!-- foot -->
        <tfoot>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <th>ID</th>
                <th>Question</th>
                <th>Answers</th>
                <th>Correct Answer</th>
                <th>Category ID</th>
                <th>Edit</th>
            </tr>
        </tfoot>
    </table>
    {#if deleteQuestions.length >= 1}
        <div class="fixed bottom-0 w-full">
            <button
                onclick="deleteModal.showModal()"
                class="float-right btn btn-primary text-white m-4"
                >Delete Question(s)</button
            >
            <dialog id="deleteModal" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">
                        Delete {deleteQuestions.length === 1
                            ? "Question"
                            : "Questions"}?
                    </h3>
                    <p class="py-4">
                        You are about to delete {deleteQuestions.length}
                        {deleteQuestions.length === 1
                            ? "question"
                            : "questions"}. Are you sure?
                    </p>
                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn">Cancel</button>
                        </form>
                        <form
                            action="?/deleteQuestions&ids={deleteQuestions}"
                            method="POST"
                        >
                            <button type="submit" class="btn">Confirm</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    {/if}
</main>
