import type {JSX} from 'solid-js';

import './SearchBox.scss';

type Props = {
    onInput?: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
}

export function SearchBox({onInput}: Props) {
    return (
        <div class='searchBox'>
			<input
				type='text'
				placeholder='search for a movie...'
				onInput={onInput}
			/>
		</div>
    )
}
