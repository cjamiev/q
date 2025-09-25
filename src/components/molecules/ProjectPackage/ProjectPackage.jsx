import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/atoms/Button';
import { runNpmScript, getDependencyVersions, updatePackage } from './projectPackageActions';
import { parseObject, isJSONString } from '../../../utils/type-check';
import { SCPackageTextWrapper } from './styles';
import { copyToClipboard } from '../../../utils/copy';

const getPackageJson = (content) => {
  const isValid = isJSONString(content);
  if (isValid) {
    return JSON.parse(content);
  }

  return '';
}

const PackageCommands = ({ scripts }) => {
  if (!scripts) {
    return null;
  }

  return <>
    {Object.keys(scripts).map((scriptName) => {
      return (
        <Button
          isSecondary
          key={scriptName}
          label={scriptName}
          onClick={() => {
            copyToClipboard(`npm run ${scriptName}`);
          }}
        />
      );
    })}
  </>
}

const Package = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const packageJson = getPackageJson(content);

  useEffect(() => {
    if (packageJson.dependencies || packageJson.devDependencies) {
      const packages = JSON.stringify({
        dependencies: packageJson.dependencies,
        devDependencies: packageJson.devDependencies
      })

      console.log(packages);
    }
  })

  const handleContentChange = ({ target: { value } }) => {
    setContent(value);
  };

  return (
    <div>
      <SCPackageTextWrapper>
        <textarea
          style={{ width: '500px', height: '500px', border: '1px solid #aaaaaa', padding: '5px' }}
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </SCPackageTextWrapper>
      <PackageCommands scripts={packageJson?.scripts} />
    </div>
  );
};

export default Package;
